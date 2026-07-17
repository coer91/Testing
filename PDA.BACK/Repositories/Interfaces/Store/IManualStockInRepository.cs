using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface IManualStockInRepository
    {
        Task<ResponseProcedure> SetManualIn(string lotNumber, string partNumber, string qty, string unit, string prodDate, string eoNumber, string vendorId, string warehouse, string model, string user);
    }
} 