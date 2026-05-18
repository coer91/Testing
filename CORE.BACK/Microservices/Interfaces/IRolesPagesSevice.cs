using HWMX.DotNet;
using Microservices.DTOs;
using Microsoft.AspNetCore.JsonPatch; 

namespace Microservices.Interfaces
{
    public interface IRolesPagesSevice
    {
        Task<ResponseDTO<RolePageDTO>> GetRolePageById(int rolePageId);
        Task<ResponseList<RolePageDTO>> GetRolePageList(int roleId);
        Task<ResponseList<RolePageDTO>> CreateRolePage(int roleId, List<int> pageIdList);
        Task<ResponseDTO<RolePageDTO>> UpdateRolePage(RolePageDTO rolePage);
        Task<ResponseDTO<RolePageDTO>> PatchRolePage(int rolePageId, JsonPatchDocument patch);
        Task<ResponseDTO> DeleteRolePage(int rolePageId);
    }
}