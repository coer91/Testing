using HWMX.DotNet;
using Microservices.DTOs;
using Microsoft.AspNetCore.JsonPatch; 

namespace Microservices.Interfaces
{
	public interface IUsersService
	{
		Task<ResponseDTO<UserDTO>> GetUser(string user);
		Task<ResponseList<UserDTO>> GetUserList(string department = "", bool onlyActive = true);
        Task<ResponseDTO<UserDTO>> CreateUser(string user);
		Task<ResponseDTO<UserDTO>> UpdateUser(UserDTO userDTO);
        Task<ResponseDTO<UserDTO>> PatchUser(string user, JsonPatchDocument patch); 
	}
}