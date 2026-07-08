using AutoMapper;
using HWMX.DotNet;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.Database;
using Repositories.Interfaces;

namespace Microservices.Services
{
	public class RolesService(
        IRoleRepository _repository,
        IUsersRolesRepository _usersRolesRepository,
        IRolesPagesRepository _rolesPagesRepository,
        IMapper _mapper
    ) : IRolesService { 

        public async Task<ResponseDTO<OptionDTO>> GetRoleById(int roleId)
		{
			ResponseDTO<OptionDTO> response = new();

			try
			{
				TblRole entity = await _repository.GetRoleBy(x => x.Id == roleId);

				if (entity is null)
					return response.NotFound();

				//Response
				response.Data = _mapper.Map<OptionDTO>(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseList<OptionDTO>> GetRoleList(bool onlyActive = true)
		{
			ResponseList<OptionDTO> response = new();

			try
			{
				List<TblRole> entities = await _repository.GetRoleList(x => !onlyActive || x.IsActive);
				List<OptionDTO> dtoList = _mapper.Map<List<OptionDTO>>(entities);

				//Response
				response.Data = [.. dtoList.OrderBy(x => x.Name)];
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseDTO<OptionDTO>> CreateRole(OptionDTO OptionDTO)
		{
			ResponseDTO<OptionDTO> response = new();

			try
			{
				//Clean Data
				OptionDTO.Name = OptionDTO.Name.CleanUpBlanks().FirstCharToUpper();

				if (string.IsNullOrWhiteSpace(OptionDTO.Name))
					return response.BadRequest();

				//Exists?
				if (await _repository.ExistsRole(x => x.Name.ToUpper().Equals(OptionDTO.Name.ToUpper())))
					return response.Conflict($"<b>{OptionDTO.Name}</b> already exists");

				//Mapping
				TblRole entity = _mapper.Map<TblRole>(OptionDTO);
				entity.Id = 0;
				entity.IsActive = true;

                //Create
                entity = Clean.NoNesting(entity);
				entity = await _repository.CreateRole(entity);

				//Response
				response.Data = _mapper.Map<OptionDTO>(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseDTO<OptionDTO>> UpdateRole(OptionDTO OptionDTO)
		{
			ResponseDTO<OptionDTO> response = new();

			try
			{
				//Clean Data
				OptionDTO.Name = OptionDTO.Name.CleanUpBlanks().FirstCharToUpper();

				if (string.IsNullOrWhiteSpace(OptionDTO.Name))
					return response.BadRequest();

				//Exists?
				if (await _repository.ExistsRole(x => x.Id != OptionDTO.Id && x.Name.ToUpper().Equals(OptionDTO.Name.ToUpper())))
					return response.Conflict($"<b>{OptionDTO.Name}</b> already exists"); 

				//Get
				TblRole entity = await _repository.GetRoleBy(x => x.Id == OptionDTO.Id);

				if (entity is null)
					return response.NotFound();

				//Mapping
				entity = _mapper.Map<TblRole>(OptionDTO);

				//Update
				entity = Clean.NoNesting(entity);
				entity = await _repository.UpdateRole(entity);

				//Response
				response.Data = _mapper.Map<OptionDTO>(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseDTO<OptionDTO>> PatchRole(int roleId, JsonPatchDocument patch)
		{
			ResponseDTO<OptionDTO> response = new();

			try
			{
				//Get
				TblRole entity = await _repository.GetRoleBy(x => x.Id == roleId);

				if (entity is null)
					return response.NotFound();

				//Mapping
				patch.ApplyTo(entity);

				//Clean Data
				entity.Name = entity.Name.CleanUpBlanks().FirstCharToUpper();

				if (string.IsNullOrWhiteSpace(entity.Name))
					return response.BadRequest();

				//Exists?
				if (await _repository.ExistsRole(x => x.Id != entity.Id && x.Name.ToUpper().Equals(entity.Name.ToUpper())))
					return response.Conflict($"<b>{entity.Name}</b> already exists"); 

				//Update
				entity = Clean.NoNesting(entity);
				entity = await _repository.UpdateRole(entity);

				//Response
				response.Data = _mapper.Map<OptionDTO>(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseDTO<OptionDTO>> DeleteRole(int roleId)
		{
			ResponseDTO<OptionDTO> response = new();

			try
			{
				//Get
				TblRole entity = await _repository.GetRoleBy(x => x.Id == roleId);

				if (entity is null)
					return response.NotFound();

				if(await _usersRolesRepository.ExistsUserRole(x => x.RoleId == roleId)) 
					return response.Conflict("This role has associated users");

                //Delete Roles Pages
                List<TblRolesPage> tblRolesPage = await _rolesPagesRepository.GetRolePageList(x => x.RoleId == roleId);

				if (tblRolesPage.Count > 0)
				{
                    tblRolesPage = Clean.NoNesting(tblRolesPage);
                    await _rolesPagesRepository.DeleteRolePage(tblRolesPage);
                }

                //Delete
                entity = Clean.NoNesting(entity);
				await _repository.DeleteRole(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}
	}
}