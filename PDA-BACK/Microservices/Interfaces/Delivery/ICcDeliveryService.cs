using HWMX.DotNet;
using Repositories.Database;
using Repositories.Database.Delivery;

namespace Microservices.Interfaces.Delivery
{
    public interface ICcDeliveryService
    {
        Task<ResponseList<GLOVIS_DELIVERY_ORDER_DTO>> GetGlovisDeliveryList();
        Task<ResponseDTO<LOT_INFORMATION_DTO>> GetLotInformationGlovis(string lotNumber);
        Task<ResponseDTO<GLOVIS_DELIVERY_ORDER_DTO>> GenerateGlovisDelvNum();
        Task<ResponseDTO<string>> DeliveryGlovisOrder(string deliveryNumber, string[] lotNumberList);
    }
} 