using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface ICcEntryRepository
    {
        Task<ResponseProcedure> GetCcEntry(string deliveryNumber);
        Task<ResponseProcedure> SetCcEntry(string deliveryNumber, string user);
    }
} 