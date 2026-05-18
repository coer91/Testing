using AutoMapper;
using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces; 
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using Repositories.HWMENMES.TablesResponse.PKG_MES_PDA.GET_LOGIN_INFO;
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces; 
using System.Data; 
using System.Security.Claims; 

namespace Microservices.Services
{
    public class AuthService( 
        ESAUSER_IRepository _userOracle, 
        PDA_IRepository _pdaOracle,
        IUsersRepository _userRepository,
        IUsersPasswordRepository _usersPasswordRepository,
        IHttpContextAccessor _httpContextAccessor,
        IConfiguration _configuration,
        IMapper _mapper
    ) : IAuthService
    {

        public HttpRequestDTO GetContext() => _httpContextAccessor.ToHttpRequest();


        #region Login
        public async Task<ResponseDTO<LoginResponseDTO>> Login(LoginDTO logIn)
        {
            ResponseDTO<LoginResponseDTO> response = new();

            try
            { 
                UserDTO userDTO = await GetUser(logIn.User);
                var credentialsResponse = await ValidateCredentials(userDTO, logIn.Password);

                if (credentialsResponse.IsValid)
                {
                    response.Data = new LoginResponseDTO
                    {
                        UserId    = userDTO.Id,
                        User      = userDTO.User,
                        RoleId    = userDTO?.Role?.Id ?? 0,
                        Role      = userDTO?.Role?.Name ?? string.Empty,
                        PartnerId = userDTO?.Partner?.Id ?? 0,
                        Partner   = userDTO?.Partner?.Name ?? string.Empty,
                        FullName  = userDTO.FullName,
                        Email     = userDTO?.Email ?? string.Empty,
                        JWT       = GenerateJWT(userDTO),
                        Message   = userDTO.FullName, 
                        Roles     = [.. userDTO.Roles.Select(x => x.Name)]
                    };

                    if (credentialsResponse.IsTemporary)
                        response.Data.Message += credentialsResponse.Message;
                }

                else
                    response.Data = new LoginResponseDTO
                    {
                        Message = credentialsResponse.Message
                    };
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseDTO<LoginResponseDTO>> LoginOracle(LoginDTO logIn)
        {
            ResponseDTO<LoginResponseDTO> response = new();

            try
            { 
                ResponseProcedure procedure = await _pdaOracle.GET_LOGIN_INFO(logIn.User, logIn.Password);

                if(procedure.Failure)
                    return response.Error(procedure.MessageList);

                IEnumerable<TBL_USER> TBL_USER = procedure.GetTable<TBL_USER>();

                if (!TBL_USER.Any())
                    return response.NotFound("Invalid credentials");

                UserDTO userDTO = await GetUser(logIn.User);

                if (userDTO is null)
                    return response.NotFound("User not Found");                 

                response.Data = new LoginResponseDTO
                {
                    UserId    = userDTO.Id,
                    User      = userDTO.User,
                    RoleId    = userDTO.Role.Id,
                    Role      = userDTO.Role.Name,
                    PartnerId = userDTO.Partner.Id,
                    Partner   = userDTO.Partner.Name,
                    FullName  = userDTO.FullName,
                    Email     = userDTO.Email,
                    JWT       = GenerateJWT(userDTO),
                    Message   = userDTO.FullName, 
                    Roles     = [.. userDTO.Roles.Select(x => x.Name)]
                };
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        private async Task<UserDTO> GetUser(string user)
        {
            UserDTO userDTO = null;
            ESAUSER esauser = await _userOracle.GetUserBy(x => x.EMP_NO.Equals(user) && x.USE_YN.Equals("Y"));

            if (esauser is null)
                return userDTO;

            TblUser tblUser = await _userRepository.GetUserBy(x => x.User.Equals(esauser.EMP_NO));

            if (tblUser is null)
                return userDTO;

            IEnumerable<TblUsersRole> tblUsersRoles = tblUser.TblUsersRoles.Where(x => x.Role.IsActive);

            userDTO = new()
            {
                Id = tblUser.Id,
                User = esauser.EMP_NO,
                FullName = esauser.USR_EN_NM,
                Email = esauser?.EMAIL ?? tblUser?.Email ?? string.Empty,
                Roles = [.. _mapper.Map<List<OptionDTO>>(tblUsersRoles.Select(x => x.Role)).Distinct()],

                Partner = new OptionDTO
                {
                    Id = tblUser?.Partner?.Id ?? 0,
                    Name = tblUser?.Partner?.Name ?? string.Empty
                }
            };

            TblRole tblRole = tblUsersRoles.FirstOrDefault(x => x.IsMain)?.Role;
            tblRole ??= tblUsersRoles.FirstOrDefault()?.Role;

            userDTO.Role = new OptionDTO
            {
                Id = tblRole?.Id ?? 0,
                Name = tblRole?.Name ?? string.Empty
            };

            return userDTO;
        }


        private async Task<CredentialsResponseDTO> ValidateCredentials(UserDTO userDTO, string password)
        {
            //Validate TblUser
            if (userDTO is null)
                return new CredentialsResponseDTO { IsValid = false, Message = "Invalid credentials" };

            //Validate TblUsersPassword
            TblUsersPassword tblUsersPassword = await _usersPasswordRepository.GetUserPasswordBy(x => x.UserId == userDTO.Id);

            if (tblUsersPassword is null)
                return new CredentialsResponseDTO { IsValid = false, Message = "Invalid credentials" };

            //Validate password
            if (Security.EqualsHash(password, tblUsersPassword.Salt, tblUsersPassword.Password))
            {
                if (!string.IsNullOrWhiteSpace(tblUsersPassword.Temporary))
                {
                    tblUsersPassword.Temporary = null;
                    tblUsersPassword.Expiration = null;
                    await _usersPasswordRepository.UpdateUserPassword(tblUsersPassword);
                }

                return new CredentialsResponseDTO { IsValid = true };
            }

            //Validate temporary password
            else if (Security.EqualsHash(password, tblUsersPassword.Salt, tblUsersPassword.Temporary))
            {
                if (DateTime.UtcNow > ((DateTime)tblUsersPassword.Expiration))
                {
                    return new CredentialsResponseDTO
                    {
                        IsValid = false,
                        IsTemporary = true,
                        ExpirationDate = tblUsersPassword.Expiration,
                        Message = "Temporary password has expired"
                    };
                }

                else
                {
                    DateTime expirationDate = ((DateTime)tblUsersPassword.Expiration).AddHours(GetContext().UtcOffset);

                    return new CredentialsResponseDTO
                    {
                        IsValid = true,
                        IsTemporary = true,
                        ExpirationDate = tblUsersPassword.Expiration,
                        Message = $"<p> - Please update your password.</p><p> - Temporal password expires at <u>{expirationDate:MMM dd} at {expirationDate:hh:mm tt}</u> </p>"
                    };
                }
            }

            else return new CredentialsResponseDTO
            {
                IsValid = false,
                Message = "Invalid credentials"
            };
        }


        private string GenerateJWT(UserDTO userDTO)
        {
            string secretKey = _configuration.GetSection("Security:SecretKey").Get<string>();
            int expirationInMinutes = _configuration.GetSection("Security:JWTExpiration").Get<int>();
            string[] roles = [.. userDTO.Roles.Select(x => x.Name)];

            List<Claim> claims = [
                new Claim("UserId"   , $"{userDTO.Id}"),
                new Claim("User"     , $"{userDTO.User}"),
                new Claim("RoleId"   , $"{userDTO.Role?.Id ?? 0}"),
                new Claim("Role"     , $"{userDTO.Role?.Name ?? string.Empty}"),
                new Claim("PartnerId", $"{userDTO.Partner?.Id ?? 0}"),
                new Claim("Partner"  , $"{userDTO.Partner?.Name ?? string.Empty}"),
                new Claim("FullName" , $"{userDTO.FullName}"),
                new Claim("Email"    , $"{userDTO.Email}"),
                new Claim("Roles"    , $"[{string.Join(',', roles)}]"),
                new Claim("Language" , LANGUAGE.ENGLISH.Id),
            ];

            foreach (string _role in roles)
                claims.Add(new Claim(ClaimTypes.Role, _role));

            return "BEARER " + Security
                .JWT(secretKey)
                .SetClaims(claims)
                .SetExpirationMinutes(expirationInMinutes)
                .Build();
        }
        #endregion 


        #region RecoveryPassword
        public async Task<ResponseDTO<LoginDTO>> RecoveryPasswordEmail(string user, int? offset)
            => await RecoveryPassword(user, "EMAIL", offset);


        public async Task<ResponseDTO<LoginDTO>> RecoveryPasswordSupport(string user, int? offset)
            => await RecoveryPassword(user, "SUPPORT", offset);


        private async Task<ResponseDTO<LoginDTO>> RecoveryPassword(string user, string way, int? offset)
        {
            ResponseDTO<LoginDTO> response = new();

            try
            {
                UserDTO userDTO = await GetUser(user);

                if (userDTO is null)
                    return response.NotFound($"User {user} not found");

                //Set Temporary
                var temporaryResponse = await SetTemporaryPassword(userDTO.Id, offset);

                if (temporaryResponse.Failure)
                    return response.Error(temporaryResponse.MessageList, temporaryResponse.HttpCode);

                switch (way)
                {
                    //EMAIL
                    case "EMAIL":
                        DateTime expirationDate = (DateTime)temporaryResponse.Data.ExpirationDate;

                        if (userDTO.Email is null)
                            return response.Conflict($"User {user} hasn't a Email");

                        var emailResponse = await new Email(_configuration)
                           .To([userDTO.Email])
                           .SetSubject("Password Recovery")
                           .SetBody(@$"                
                                <div>
                                    <p> Dear <i>{userDTO.FullName}</i>:</p>
                                    <p> Please use the following credentials to access the <b>COER System</b> </p>
                                    <p style='padding: 10px 0px 0px 10px'> User: {user} </p>
                                    <p style='padding: 0px 0px 10px 10px'> Password: <span style='padding: 2px' class='background-color-yellow'> {temporaryResponse.Data.Message} </span> </p>
                                    <p> Once you have logged in, please update your password. </p>
                                    <p> This temporary password expires on <u>{expirationDate:MMM dd} at {expirationDate:hh:mm tt}</u>.</p> 
                                </div>
                           ").Send();

                        if (emailResponse.Failure)
                            return response.Error(emailResponse.MessageList, emailResponse.HttpCode);

                        response.Data = new LoginDTO
                        {
                            User = user,
                            Password = $"A temporary password has been sent to <br><b>{userDTO.Email}</b>"
                        };
                        break;

                    //SUPPORT
                    case "SUPPORT":
                        response.Data = new LoginDTO
                        {
                            User = user,
                            Password = temporaryResponse.Data.Message
                        };
                        break;
                }
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        private async Task<ResponseDTO<CredentialsResponseDTO>> SetTemporaryPassword(int userId, int? offset)
        {
            ResponseDTO<CredentialsResponseDTO> response = new();

            try
            {
                string password = Security.GeneratePassword();
                DateTime passwordExpiration = Dates.GetCurrentDateTimeUTC().AddMinutes(int.Parse(_configuration["Security:TemporaryPasswordExpiration"]));
                offset ??= GetContext().UtcOffset;

                //Get Password
                TblUsersPassword tblUsersPassword = await _usersPasswordRepository.GetUserPasswordBy(x => x.UserId == userId);

                if (tblUsersPassword is null)
                {
                    byte[] salt = Security.GenerateSalt();
                    string passwordHash = Security.GenerateHash(password, salt);

                    tblUsersPassword = new()
                    {
                        Id = 0,
                        UserId = userId,
                        Password = passwordHash,
                        Salt = salt,
                        Temporary = passwordHash,
                        Expiration = passwordExpiration
                    };

                    await _usersPasswordRepository.CreateUserPassword(tblUsersPassword);
                }

                else
                {
                    tblUsersPassword.Temporary = Security.GenerateHash(password, tblUsersPassword.Salt);
                    tblUsersPassword.Expiration = passwordExpiration;

                    await _usersPasswordRepository.UpdateUserPassword(tblUsersPassword);
                }

                response.Data = new()
                {
                    IsValid = true,
                    IsTemporary = true,
                    ExpirationDate = ((DateTime)tblUsersPassword.Expiration).AddHours((double)offset),
                    Message = password
                };
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
        #endregion 


        public async Task<ResponseDTO<string>> SetPassword(string password)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(password))
                    return response.BadRequest("Password not provided");

                //Get User
                TblUser tblUser = await _userRepository.GetUserBy(x => x.User.Equals(GetContext().User));

                if (tblUser is null)
                    return response.NotFound();

                //Set Password
                byte[] salt = Security.GenerateSalt();
                string passwordHash = Security.GenerateHash(password, salt);
                TblUsersPassword tblUsersPassword = await _usersPasswordRepository.GetUserPasswordBy(x => x.UserId == tblUser.Id);

                if (tblUsersPassword is null)
                {
                    tblUsersPassword = new TblUsersPassword()
                    {
                        Id = 0,
                        UserId = tblUser.Id,
                        Password = passwordHash,
                        Salt = salt,
                        Temporary = null,
                        Expiration = null,
                        User = null
                    };

                    tblUsersPassword = Clean.NoNesting(tblUsersPassword, ["Salt"]);
                    await _usersPasswordRepository.CreateUserPassword(tblUsersPassword);
                    response.Data = "Your Password has been assigned";
                }

                else
                {
                    tblUsersPassword.Password = passwordHash;
                    tblUsersPassword.Salt = salt;
                    tblUsersPassword.Temporary = null;
                    tblUsersPassword.Expiration = null;

                    tblUsersPassword = Clean.NoNesting(tblUsersPassword, ["Salt"]);
                    await _usersPasswordRepository.UpdateUserPassword(tblUsersPassword);
                    response.Data = "Your Password has been updated";
                } 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> UpdateJWT()
        {
            ResponseDTO<string> response = new();

            try
            {
                string secretKey = _configuration.GetSection("Security:SecretKey").Get<string>();
                int expirationInMinutes = _configuration.GetSection("Security:JWTExpiration").Get<int>();
                IEnumerable<Claim> claims = Security.GetClaims(_httpContextAccessor).Where(x => !x.Type.Equals("Role") && !x.Type.Equals("Roles"));

                int userId = int.Parse(claims.FirstOrDefault(x => x.Type.Equals("UserId"))?.Value ?? "0");
                TblUser tblUser = await _userRepository.GetUserBy(x => x.Id == userId);

                if (tblUser is not null)
                {
                    IEnumerable<TblUsersRole> tblUsersRoleList = tblUser.TblUsersRoles.Where(x => x.Role.IsActive);
                    claims = claims.Append(new Claim("Roles", $"[{string.Join(',', tblUsersRoleList.Select(x => x.Role.Name).ToArray())}]"));

                    TblRole mainRole = tblUsersRoleList.FirstOrDefault(x => x.IsMain)?.Role ?? null;
                    mainRole ??= tblUser.TblUsersRoles.FirstOrDefault(x => x.Role.IsActive)?.Role ?? null;
                    claims = claims.Append(new Claim("Role", $"{mainRole?.Name ?? string.Empty}"));
                }

                response.Data = Security
                    .JWT(secretKey)
                    .SetClaims(claims)
                    .SetExpirationMinutes(expirationInMinutes)
                    .Build();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        private class CredentialsResponseDTO
        {
            public bool IsValid { get; set; } = false;
            public bool IsTemporary { get; set; } = false;
            public DateTime? ExpirationDate { get; set; } = null;
            public string Message { get; set; }
        }
    }
}