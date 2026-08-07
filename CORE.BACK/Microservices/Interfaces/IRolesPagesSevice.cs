using HWMX.DotNet;
using Microservices.DTOs;
using Microsoft.AspNetCore.JsonPatch; 

namespace Microservices.Interfaces
{
    public interface IRolesPagesSevice
    { 
        Task<ResponseList<RolePageDTO>> GetRolePageList(int projectId, int roleId, bool onlyActive = true);
        Task<ResponseList<RolePageDTO>> CreateRolePage(int roleId, List<int> pageIdList); 
        Task<ResponseDTO<RolePageDTO>> PatchRolePage(int rolePageId, JsonPatchDocument patch);
        Task<ResponseDTO> DeleteRolePage(int rolePageId);
    }
}