using AutoMapper;
using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.Database;
using Repositories.Interfaces;
using System.Text.RegularExpressions;

namespace Microservices.Services
{
	public class UsersService(IUsersRepository _repository, IMapper _mapper) : IUsersService {
        

        public async Task<ResponseDTO<UserDTO>> GetUser(string user)
		{
			ResponseDTO<UserDTO> response = new();

			try
			{
				//Get user from Oracle
                ResponseProcedure procedure = await _repository.GetUserOracle(user);

                if (procedure.Failure)
                    return response.Error(procedure.MessageList);

                UserOracleDTO userOracle = procedure.GetTable<UserOracleDTO>().FirstOrDefault();

				if(userOracle is null)
					return response.NotFound();

				//Build UserDTO
                UserDTO userDTO = _mapper.Map<UserDTO>(userOracle);

                TblUser tblUser = await _repository.GetUserBy(x => x.User.Equals(user));

				if (tblUser is not null)
				{
                    userDTO.Id        = tblUser.Id;
                    userDTO.PartnerId = tblUser.Partner?.Id   ?? 0;
                    userDTO.Partner   = tblUser.Partner?.Name ?? string.Empty;
					userDTO.Roles     = _mapper.Map<List<OptionDTO>>(tblUser.TblUsersRoles);
                }

                //Response
                response.Data = userDTO; 
            }

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseList<UserDTO>> GetUserList(string department = "", bool onlyActive = true)
		{
			ResponseList<UserDTO> response = new();

			try
			{
                //Get user from Oracle
                ResponseProcedure procedure = await _repository.GetUserListOracle(department, onlyActive);

                if (procedure.Failure)
                    return response.Error(procedure.MessageList);

                List<UserOracleDTO> usersOracle = procedure.GetTable<UserOracleDTO>(); 

                response.Data = _mapper.Map<List<UserDTO>>(usersOracle);
                
				response.Data = [.. 
					response.Data
					.Where(x => !string.IsNullOrWhiteSpace(x.FullName))
					.OrderBy(x => x.FullName)
				];  
            }

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


        public async Task<ResponseDTO<UserDTO>> CreateUser(string user)
        {
            ResponseDTO<UserDTO> response = new();

            try
            {
                //Get user from Oracle
                ResponseProcedure procedure = await _repository.GetUserOracle(user);

                if (procedure.Failure)
                    return response.Error(procedure.MessageList);

                UserOracleDTO userOracle = procedure.GetTable<UserOracleDTO>().FirstOrDefault();

                if (userOracle is null)
                    return response.NotFound();

				if (!userOracle.IS_ACTIVE.Equals("Y"))
					return response.BadRequest("User is not active");

				TblUser tblUser = new() 
				{ 
					Id = 0,
					User = user,
                    LanguageId = LANGUAGE.ENGLISH.Id
                };

                tblUser = await _repository.CreateUser(tblUser);

                //Response
                response.Data = _mapper.Map<UserDTO>(userOracle);
                response.Data.Id = tblUser.Id;  
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<UserDTO>> UpdateUser(UserDTO userDTO)
        {
            ResponseDTO<UserDTO> response = new();

            try
            {
                //Get
                TblUser entity = await _repository.GetUserBy(x => x.Id == userDTO.Id);

                if (entity is null)
                    return response.NotFound();

                entity.PartnerId = userDTO.PartnerId;
                entity = Clean.NoNesting(entity);
                entity = await _repository.UpdateUser(entity);

                //Response
                response.Data = userDTO;
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<UserDTO>> PatchUser(string user, JsonPatchDocument patch)
		{
			ResponseDTO<UserDTO> response = new();

			try
			{
				//Get
				TblUser entity = await _repository.GetUserBy(x => x.User.Equals(user));

				if (entity is null)
					return response.NotFound();

				//Mapping
				patch.ApplyTo(entity);

				//Clean Data
				entity.User = entity.User.CleanUpBlanks().FirstCharToUpper();

				if (string.IsNullOrWhiteSpace(entity.User))
					return response.BadRequest();

				//Exists?
				if (await _repository.ExistsUser(x => x.Id != entity.Id && x.User.ToUpper().Equals(entity.User.ToUpper())))
					return response.Conflict($"<b>{entity.User}</b> already exists"); 

				//Update
				entity = Clean.NoNesting(entity);
				entity = await _repository.UpdateUser(entity);

				//Response
				response.Data = _mapper.Map<UserDTO>(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		} 
    }
}