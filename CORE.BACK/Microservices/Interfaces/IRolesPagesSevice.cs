using HWMX.DotNet;
using Microservices.DTOs;
using Microsoft.AspNetCore.JsonPatch; 

namespace Microservices.Interfaces
{
    public interface IRolesPagesSevice
    { 
        Task<ResponseList<RolePageDTO>> GetRolePageListByRoleId(int projectId, int roleId, bool onlyActive = true);
        Task<ResponseList<RolePageDTO>> GetRolePageListByPageId(int pageId, bool onlyActive = true);
        Task<ResponseList<RolePageDTO>> AddPageListByRole(int roleId, List<int> pageIdList);
        Task<ResponseList<RolePageDTO>> AddRoleListByPage(int pageId, List<int>  roleIdList);
        Task<ResponseDTO<RolePageDTO>> PatchRolePage(int rolePageId, JsonPatchDocument patch);
        Task<ResponseDTO> DeleteRolePage(int rolePageId);
    }
}