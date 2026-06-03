using Microsoft.AspNetCore.JsonPatch;
using Microservices.DTOs;
using HWMX.DotNet;

namespace Microservices.Interfaces
{
	public interface IUsersService
	{
		Task<ResponseDTO<UserDTO>> GetUser(string user);
		Task<ResponseList<UserDTO>> GetUserList(string department = "", bool onlyActive = true);
		Task<ResponseDTO<UserDTO>> CreateUser(UserDTO userDTO);
		Task<ResponseDTO<UserDTO>> UpdateUser(UserDTO userDTO);
		Task<ResponseDTO<UserDTO>> PatchUser(string user, JsonPatchDocument patch); 
	}
}