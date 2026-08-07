using HWMX.DotNet.ORM; 

namespace Repositories.Interfaces.Store
{
    public interface ILpEntryRepository
    {
        Task<ResponseProcedure> GetLpEntry(string vbelg);
        Task<ResponseProcedure> SetLpEntry(string vbelg, string user);        
    }
}