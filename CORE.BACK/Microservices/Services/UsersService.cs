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
        ESAUSER_IRepository _userOracle,
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

                TblUser tblUser = await _repository.GetUserBy(x => x.User.Equals(user)); 

				if (tblUser is null)
					return response.NotFound();

				//Response
				response.Data = _mapper.Map<UserDTO>(tblUser);
                response.Data.FullName = userOracle.USR_EN_NM;
				response.Data.Email = userOracle.EMAIL;
            }

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseList<UserDTO>> GetUserList(bool onlyActive = true)
		{
			ResponseList<UserDTO> response = new();

			try
			{
                List<ESAUSER> usersOracle = await _userOracle.GetUserList(x => !onlyActive || x.USE_YN.Equals("Y")); 
                List<TblUser> entities = await _repository.GetUserList(x => true);

				//Response
                response.Data = [.. (
					from dto in _mapper.Map<List<UserDTO>>(entities)

					join users in usersOracle
					on dto.User equals users.USR_ID 
					into userJOIN
					from users in userJOIN

                    select new UserDTO
					{
						Id       = dto.Id,
						User     = dto.User,
						FullName = users.USR_EN_NM,
                        Email    = users.EMAIL,
						Partner  = dto.Partner,
						Role     = null,
						Roles    = []
                    }
                ).OrderBy(x => x.FullName)]; 
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