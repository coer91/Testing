using HWMX.DotNet;
using Microservices.DTOs;
using Microsoft.AspNetCore.Http; 

namespace Microservices.Interfaces
{
	public interface IUsersImageService
	{
		Task<ResponseDTO<ImageDTO>> GetUserImage(string user); 
		Task<ResponseDTO<ImageDTO>> UploadUserImage(string user, IFormFileCollection fileCollection);
        Task<ResponseDTO<string>> DeleteUserImage(string user);
    }
}