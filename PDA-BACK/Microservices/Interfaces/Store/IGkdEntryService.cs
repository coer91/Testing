using HWMX.DotNet;
using Repositories.Database.Store;

namespace Microservices.Interfaces.Store
{
    public interface IGkdEntryService
    {
        Task<ResponseList<LOT_GKD_ENTRY_DTO>> GetKDLotInfo(string lotNumber); 
        Task<ResponseDTO<string>> SetKdStockIn(List<LOT_GKD_ENTRY_DTO> lotList);
        Task<ResponseDTO<string>> SetKdStockAoneIn(string vbelg);
    }
} 