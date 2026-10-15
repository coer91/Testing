using HWMX.DotNet; 
using Repositories.Database; 

namespace Microservices.Interfaces.Delivery
{
    public interface ISendingEngineService
    {
        Task<ResponseList<GLOVIS_ORDER_DTO>> GetOrderList();
        Task<ResponseDTO<ENGINE_DTO>> GetEngineByOrder(string orderNumber, string engineCode);        
        Task<ResponseDTO<string>> SetGlovisOrder(string orderNumber);

    }
}
