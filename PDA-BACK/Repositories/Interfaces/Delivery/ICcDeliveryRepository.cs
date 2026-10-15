using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Delivery
{
    public interface ICcDeliveryRepository
    {
        Task<ResponseProcedure> GetGlovisDeliveryList();
        Task<ResponseProcedure> GetLotInformationGlovis(string lotNumber);
        Task<ResponseProcedure> GenerateGlovisDelvNum(string user);
        Task<ResponseProcedure> DeliveryGlovisOrder(string deliveryNumber, string[] lotNumberList, string user);
    }
} 