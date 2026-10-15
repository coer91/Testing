using HWMX.DotNet; 
using Repositories.Database;

namespace Microservices.Interfaces.Location
{
    public interface IEngineStocktakingService
    {
        Task<ResponseList<STOCKTAKING_PALLET_DTO>> Get3CPalletInfo(string PalletCode);
        Task<ResponseDTO<string>> SetFinalStocktaking(string[] SerialNoList);
    }
}