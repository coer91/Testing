using Microservices.Interfaces;
using Microservices.DTOs;
using AutoMapper;
using HWMX.DotNet;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Database;

namespace Microservices.Services
{
    public class UsersRolesService(IUsersRolesRepository _repository, IMapper _mapper) : UsersRolesIService {


        public async Task<ResponseDTO<UserRoleDTO>> GetUserRoleById(int userRoleId)
        {
            ResponseDTO<UserRoleDTO> response = new();

            try
            {
                TblUsersRole entity = await _repository.GetUserRoleBy(x => x.Id == userRoleId);

                if (entity is null)
                    return response.NotFound();

                //Response
                response.Data = _mapper.Map<UserRoleDTO>(entity);

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<UserRoleDTO>> GetUserRoleList(int userId, bool onlyActive = true)
        {
            ResponseList<UserRoleDTO> response = new();

            try
            {
                List<TblUsersRole> entities = await _repository.GetUserRoleList(x
                    => x.UserId == userId
                    && (!onlyActive || x.Role.IsActive)
                );

                List<UserRoleDTO> dtoList = _mapper.Map<List<UserRoleDTO>>(entities);

                //Response
                response.Data = [.. dtoList.OrderBy(x => x.Role)];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<UserRoleDTO>> CreateUserRole(int userId, int roleId)
        {
            ResponseDTO<UserRoleDTO> response = new();

            try
            {
                TblUsersRole tblUsersRole = await _repository.GetUserRoleBy(x 
                    => x.UserId == userId
                    && x.RoleId == roleId
                );

                //Exists?
                if (tblUsersRole is not null) 
                    return response.Conflict($"The user already has the <b>{tblUsersRole.Role}</b> role associated");

                //Mapping
                tblUsersRole = new()
                {
                    Id = 0,
                    UserId = userId,
                    RoleId = roleId
                };

                //Create 
                tblUsersRole = await _repository.CreateUserRole(tblUsersRole);

                //Response
                response.Data = _mapper.Map<UserRoleDTO>(tblUsersRole);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseDTO<UserRoleDTO>> SetUserRoleMain(int userId, string roleId)
        {
            ResponseDTO<UserRoleDTO> response = new(); 

            try
            {
                List<TblUsersRole> tblUsersRoleList = await _repository.GetUserRoleList(x => x.UserId == userId);

                //Set current Main
                int index = tblUsersRoleList.FindIndex(x => x.IsMain);

                if (index >= 0)
                    tblUsersRoleList[index].IsMain = false;

                //Set new Main
                index = tblUsersRoleList.FindIndex(x 
                    => x.RoleId.ToString().Equals(roleId) 
                    || x.Role.Name.Equals(roleId)
                );

                if(index < 0)
                    return response.Conflict($"Unassigned role");

                tblUsersRoleList[index].IsMain = true;
                response.Data = _mapper.Map<UserRoleDTO>(tblUsersRoleList[index]);

                tblUsersRoleList = Clean.NoNesting(tblUsersRoleList);
                await _repository.UpdateUserRole(tblUsersRoleList); 
                
            }

            catch (Exception ex)
            { 
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<UserRoleDTO>> DeleteUserRole(int userRoleId)
        {
            ResponseDTO<UserRoleDTO> response = new(); 

            try
            {
                //Get
                TblUsersRole tblUsersRole = await _repository.GetUserRoleBy(x => x.Id == userRoleId);

                if (tblUsersRole is null)
                    return response.NotFound();

                tblUsersRole = Clean.NoNesting(tblUsersRole);
                await _repository.DeleteUserRole(tblUsersRole); 
            }

            catch (Exception ex)
            { 
                return response.Exception(ex);
            }

            return response;
        }
    }
}