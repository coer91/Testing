using HWMX.DotNet;
using Microservices.DTOs;
using Repositories.HWMENMES.Database;

namespace Microservices.Interfaces
{
    public interface IAuthService
    {
        HttpRequestDTO GetContext();
        Task<ResponseDTO<LoginResponseDTO>> Login(LoginDTO logIn);
        Task<ResponseDTO<LoginResponseDTO>> LoginOracle(LoginDTO logIn);
        Task<ResponseDTO<LoginDTO>> RecoveryPasswordEmail(string user, int? offset);
        Task<ResponseDTO<LoginDTO>> RecoveryPasswordSupport(string user, int? offset);
        Task<ResponseDTO<string>> SetPassword(string password);
        Task<ResponseDTO<string>> UpdateJWT(); 
    }
}