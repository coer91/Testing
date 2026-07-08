using AutoMapper;
using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces; 
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration; 
using Repositories.Database;
using Repositories.Interfaces; 
using System.Data; 
using System.Security.Claims; 

namespace Microservices.Services
{
    public class AuthService(  
        IUsersRepository _userRepository, 
        IHttpContextAccessor _httpContextAccessor,
        IConfiguration _configuration,
        IMapper _mapper
    ) : IAuthService
    {

        public HttpRequestDTO GetContext() => _httpContextAccessor.ToHttpRequest();

        
        public async Task<ResponseDTO<LoginResponseDTO>> Login(LoginDTO logIn)
        {
            ResponseDTO<LoginResponseDTO> response = new();

            try
            { 
                //Login in Oracle
                ResponseProcedure procedure = await _userRepository.Login(logIn.User, logIn.Password);

                if(procedure.Failure)
                    return response.Error(procedure.MessageList);

                UserOracleDTO login = procedure.GetTable<UserOracleDTO>().FirstOrDefault();

                if (login is null)
                    return response.NotFound("Invalid credentials");

                //Build UserDTO
                TblUser tblUser = await _userRepository.GetUserBy(x => x.User.Equals(login.USER));

                if (tblUser is null)
                    return response.NotFound();

                IEnumerable<TblUsersRole> tblUsersRoles = tblUser.TblUsersRoles.Where(x => x.Role.IsActive);

                UserDTO userDTO = new()
                {
                    Id           = tblUser.Id,
                    User         = login.USER,
                    FullName     = login.FULL_NAME,
                    Email        = login.EMAIL ?? tblUser?.Email ?? string.Empty,
                    Factory      = login.FACTORY,
                    DepartmentId = login.DEPARTMENT_CODE,
                    Department   = login.DEPARTMENT,
                    PartnerId    = tblUser?.Partner?.Id ?? 0,
                    Partner      = tblUser?.Partner?.Name ?? string.Empty,
                    Language     = tblUser.LanguageId,
                    Roles        = [.. _mapper.Map<List<OptionDTO>>(tblUsersRoles.Select(x => x.Role)).Distinct()],
                };

                //Response
                response.Data = new LoginResponseDTO
                {
                    UserId       = userDTO.Id,
                    User         = userDTO.User,
                    DepartmentId = userDTO.DepartmentId,
                    Department   = userDTO.Department,
                    PartnerId    = userDTO.PartnerId,
                    Partner      = userDTO.Partner,
                    FullName     = userDTO.FullName,
                    Email        = userDTO.Email,
                    Language     = userDTO.Language,
                    Factory      = userDTO.Factory,
                    JWT          = GenerateJWT(userDTO),
                    Message      = userDTO.FullName,
                    Roles        = [.. userDTO.Roles.Select(x => x.Name)]
                };
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        private string GenerateJWT(UserDTO userDTO)
        {
            string secretKey = _configuration.GetSection("Security:SecretKey").Get<string>();
            int expirationInMinutes = _configuration.GetSection("Security:JWTExpiration").Get<int>();
            string[] roles = [.. userDTO.Roles.Select(x => x.Name)];

            List<Claim> claims = [
                new Claim("UserId"      , $"{userDTO.Id}"),
                new Claim("User"        , $"{userDTO.User}"), 
                new Claim("FullName"    , $"{userDTO.FullName}"),
                new Claim("Email"       , $"{userDTO.Email}"),
                new Claim("Factory"     , $"{userDTO.Factory}"),
                new Claim("DepartmentId", $"{userDTO.DepartmentId}"),
                new Claim("Department"  , $"{userDTO.Department}"),
                new Claim("PartnerId"   , $"{userDTO.PartnerId}"),
                new Claim("Partner"     , $"{userDTO.Partner}"),
                new Claim("Language"    , $"{userDTO.Language}"),
                new Claim("Roles"       , $"[{string.Join(',', roles)}]"), 
            ];

            foreach (string _role in roles)
                claims.Add(new Claim(ClaimTypes.Role, _role));

            return "BEARER " + Security
                .JWT(secretKey)
                .SetClaims(claims)
                .SetExpirationMinutes(expirationInMinutes)
                .Build();
        }


        public async Task<ResponseDTO<string>> SetLanguage(string languageId)
        {
            ResponseDTO<string> response = new();

            try
            {
                string user = GetContext().User;
                TblUser tblUser = await _userRepository.GetUserBy(x => x.User.Equals(user));

                if (tblUser is null)
                    return response.NotFound();

                tblUser.LanguageId = languageId;
                tblUser = Clean.NoNesting(tblUser);
                await _userRepository.UpdateUser(tblUser);
                response.Data = languageId;
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
                IEnumerable<Claim> claims = Security.GetClaims(_httpContextAccessor).Where(x => !x.Type.Equals("Language") && !x.Type.Equals("Roles"));

                int userId = int.Parse(claims.FirstOrDefault(x => x.Type.Equals("UserId"))?.Value ?? "0");
                TblUser tblUser = await _userRepository.GetUserBy(x => x.Id == userId);

                if (tblUser is not null)
                {
                    IEnumerable<TblUsersRole> tblUsersRoleList = tblUser.TblUsersRoles.Where(x => x.Role.IsActive);
                    claims = claims.Append(new Claim("Roles", $"[{string.Join(',', tblUsersRoleList.Select(x => x.Role.Name).ToArray())}]"));                    
                    claims = claims.Append(new Claim("Language", $"{tblUser.LanguageId}"));
                }

                response.Data = "BEARER " + Security
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
    }
}