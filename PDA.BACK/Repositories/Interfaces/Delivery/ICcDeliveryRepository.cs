using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Delivery
{
    public interface ICcDeliveryRepository
    {
        Task<ResponseProcedure> GetGlovisDeliveryNumberList();
        Task<ResponseProcedure> GetLotInfoCC(string lotNumber);
        Task<ResponseProcedure> DeliveryOrder(string deliveryNumber, string[] lotNumberList, string user);
    }
} 