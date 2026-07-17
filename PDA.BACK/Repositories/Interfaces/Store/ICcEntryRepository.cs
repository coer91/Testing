using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface ICcEntryRepository
    {
        Task<ResponseProcedure> GetCCStockIn(string deliveryNumber);
        Task<ResponseProcedure> SetCCStockIn(string deliveryNumber, string user);
    }
} 