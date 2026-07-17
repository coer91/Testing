using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces.Store
{
    public interface IGkdEntryService
    {
        Task<ResponseList<LotInformationAoneDTO>> GetKDLotInfo(string lotNumber); 
        Task<ResponseDTO<string>> SetKdStockIn(List<LotInformationAoneDTO> lotList);
        Task<ResponseDTO<string>> SetKdStockAoneIn(string vbelg);
    }
} 