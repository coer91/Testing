using HWMX.DotNet;
using Microservices.DTOs;  

namespace Microservices.Interfaces
{
    public interface IUsersRolesService
    {
        Task<ResponseDTO<UserRoleDTO>> GetUserRoleById(int userRoleId);
        Task<ResponseList<UserRoleDTO>> GetUserRoleList(int userId, bool onlyActive = true);
        Task<ResponseDTO<UserRoleDTO>> CreateUserRole(int userId, int roleId);
        Task<ResponseList<UserRoleDTO>> CreateUserRoleList(int userId, int[] roleList);
        Task<ResponseDTO<UserRoleDTO>> SetUserRoleMain(int userId, string roleId);
        Task<ResponseDTO<UserRoleDTO>> DeleteUserRole(int userId, int roleId);
    }
}