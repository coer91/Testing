using Repositories.Database.Store;
using HWMX.DotNet;

namespace Microservices.Interfaces.Store
{
    public interface ILpEntryService
    {
        Task<ResponseList<LOT_LP_ENTRY_DTO>> GetLpEntry(string vbelg);
        Task<ResponseDTO<string>> SetLpEntry(string vbelg);
    }
}