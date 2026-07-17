using HWMX.DotNet.ORM; 

namespace Repositories.Interfaces.Store
{
    public interface ILpEntryRepository
    {
        Task<ResponseProcedure> GetLPStockIn(string vbelg);
        Task<ResponseProcedure> SetLPStockIn(string vbelg, string user);        
    }
}