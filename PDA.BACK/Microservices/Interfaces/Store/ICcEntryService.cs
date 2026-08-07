using Repositories.Database.Store;
using HWMX.DotNet; 

namespace Microservices.Interfaces.Store
{
    public interface ICcEntryService
    {
        Task<ResponseList<LOT_CC_ENTRY_DTO>> GetCcEntry(string deliveryNumber);
        Task<ResponseDTO<string>> SetCcEntry(string deliveryNumber);
    }
} 