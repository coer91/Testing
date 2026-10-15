using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Delivery
{
    public interface ISendingEngineRepository
    {
        Task<ResponseProcedure> GetOrderList(string station, string user);
        Task<ResponseProcedure> GetEngineByOrder(string orderNumber, string station, string engineType, string engineNumber, string user);
        Task<ResponseProcedure> SetGlovisOrder(string orderNumber, string user);
    } 
}
