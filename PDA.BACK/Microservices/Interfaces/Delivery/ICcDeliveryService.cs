using HWMX.DotNet;
using Repositories.Database;

namespace Microservices.Interfaces.Delivery
{
    public interface ICcDeliveryService
    {
        Task<ResponseList<string>> GetGlovisDeliveryNumberList();
        //Task<ResponseDTO<LOT_INFORMATION>> GetLotInfoCC(string lotNumber);
        Task<ResponseDTO<string>> DeliveryOrder(string deliveryNumber, string[] lotNumberList);
    }
} 