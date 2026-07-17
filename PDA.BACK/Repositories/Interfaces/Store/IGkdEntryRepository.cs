using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface IGkdEntryRepository
    {
        Task<ResponseProcedure> GetKDLotInfo(string lotNumber); 
        Task<ResponseProcedure> SetKdStockIn(string lotNumber, string partNumber, string qty, string unit, string prodDate, string eoNumber, string vdCd, string user);
        Task<ResponseProcedure> SetKdStockAoneIn(string vbelg, string user);
    }
} 