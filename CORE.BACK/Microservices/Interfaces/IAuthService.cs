using HWMX.DotNet;
using Microservices.DTOs; 

namespace Microservices.Interfaces
{
    public interface IAuthService
    {
        HttpRequestDTO GetContext();
        Task<ResponseDTO<LoginResponseDTO>> Login(LoginDTO logIn);  
        Task<ResponseDTO<string>> SetLanguage(string languageId);
        Task<ResponseDTO<string>> UpdateJWT(); 
    }
}