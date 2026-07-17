using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces.Delivery
{
    public interface ICcDeliveryService
    {
        Task<ResponseList<string>> GetGlovisDeliveryNumberList();
        Task<ResponseDTO<LotInformationDTO>> GetLotInfoCC(string lotNumber);
        Task<ResponseDTO<string>> DeliveryOrder(string deliveryNumber, string[] lotNumberList);
    }
} 