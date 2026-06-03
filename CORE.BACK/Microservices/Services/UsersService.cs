using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces;

namespace Microservices.Services
{
	public class UsersService(
        IUsersRepository _repository,
        IESAUSER_Repository _userOracle,
        IMapper _mapper
    ) : IUsersService { 

        public async Task<ResponseDTO<UserDTO>> GetUser(string user)
		{
			ResponseDTO<UserDTO> response = new();

			try
			{
                ESAUSER userOracle = await _userOracle.GetUserBy(x => x.USR_ID.Equals(user));

				if (userOracle is null)
					return response.NotFound();

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
                List<ESAUSER> usersOracle = await _userOracle.GetUserList(x 
					=> (string.IsNullOrWhiteSpace(department) || x.DEPT_CD.Equals(department))
					&& !onlyActive || x.USE_YN.Equals("Y") 
                );

				response.Data = _mapper.Map<List<UserDTO>>(usersOracle);
                response.Data = [.. response.Data.OrderBy(x => x.FullName)];  
            }

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseDTO<UserDTO>> CreateUser(UserDTO userDTO)
		{
			ResponseDTO<UserDTO> response = new();

			try
			{
				//Clean Data
				userDTO.User = userDTO.User.CleanUpBlanks().FirstCharToUpper();

				if (string.IsNullOrWhiteSpace(userDTO.User))
					return response.BadRequest();

				//Exists?
				if (await _repository.ExistsUser(x => x.User.ToUpper().Equals(userDTO.User.ToUpper())))
					return response.Conflict($"<b>{userDTO.User}</b> already exists");

				//Mapping
				TblUser entity = _mapper.Map<TblUser>(userDTO);
				entity.Id = 0;

				//Create
				entity = Clean.NoNesting(entity);
				entity = await _repository.CreateUser(entity);

				//Response
				response.Data = _mapper.Map<UserDTO>(entity);
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
				//Clean Data
				userDTO.User = userDTO.User.CleanUpBlanks().FirstCharToUpper();

				if (string.IsNullOrWhiteSpace(userDTO.User))
					return response.BadRequest();

				//Exists?
				if (await _repository.ExistsUser(x => x.Id != userDTO.Id && x.User.ToUpper().Equals(userDTO.User.ToUpper())))
					return response.Conflict($"<b>{userDTO.User}</b> already exists"); 

				//Get
				TblUser entity = await _repository.GetUserBy(x => x.Id == userDTO.Id);

				if (entity is null)
					return response.NotFound();

				//Mapping
				entity = _mapper.Map<TblUser>(userDTO);

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