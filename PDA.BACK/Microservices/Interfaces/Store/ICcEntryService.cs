using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces.Store
{
    public interface ICcEntryService
    {
        Task<ResponseList<DataSourceDTO>> GetCCStockIn(string deliveryNumber);
        Task<ResponseDTO<string>> SetCCStockIn(string deliveryNumber);
    }
} 