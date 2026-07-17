using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces.Store
{
    public interface ILpEntryService
    {
        Task<ResponseList<LotInformationDTO>> GetLPStockIn(string vbelg);
        Task<ResponseDTO<string>> SetLPStockIn(string vbelg);
    }
}