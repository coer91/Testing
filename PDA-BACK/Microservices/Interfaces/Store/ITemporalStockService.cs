using HWMX.DotNet; 
using Repositories.Database.Store;

namespace Microservices.Interfaces.Store
{
    public interface ITemporalStockService
    {
        Task<ResponseList<TEMPORAL_STOCK_DTO>> GetTemporalStock(string operation);
        Task<ResponseDTO<string>> SetTemporalStock(string operation, TEMPORAL_STOCK_DTO lotDTO);
        Task<ResponseDTO<string>> DeleteTemporalStock(string operation, string barcode);
        Task<ResponseDTO<string>> ClearTemporalStock(string operation);
    }
} 