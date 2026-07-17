using HWMX.DotNet; 

namespace Microservices.Interfaces.Store
{
    public interface IContainerService
    {
        Task<ResponseList<dynamic>> GetContainerDownload(string orderNumber);
        Task<ResponseDTO<string>> SetContainerDownload(string orderNumber, string[] caseLabelList);
        Task<ResponseList<dynamic>> GetContainerLoad(string orderNumber);        
        Task<ResponseDTO<string>>  SetContainerLoad(string orderNumber, string[] caseLabelList); 
        Task<ResponseDTO<string>> CheckOrder(string orderNumber, string caseLabel);
    }
} 