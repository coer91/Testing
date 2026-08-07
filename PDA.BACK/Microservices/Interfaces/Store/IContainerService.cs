using HWMX.DotNet;
using Repositories.Database.Store;

namespace Microservices.Interfaces.Store
{
    public interface IContainerService
    {
        Task<ResponseList<CONTAINER_DTO>> GetContainerDownload(string orderNumber);
        Task<ResponseDTO<string>> SetContainerDownload(string orderNumber, string[] caseLabelList);
        Task<ResponseList<CONTAINER_DTO>> GetContainerLoad(string orderNumber);        
        Task<ResponseDTO<string>>  SetContainerLoad(string orderNumber, string[] caseLabelList); 
        Task<ResponseDTO<string>> CheckContainerOrder(string orderNumber, string caseLabel);
    }
} 