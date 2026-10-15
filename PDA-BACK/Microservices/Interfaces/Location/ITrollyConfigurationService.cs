using HWMX.DotNet; 
using Repositories.Database;

namespace Microservices.Interfaces.Location
{
    public interface ITrollyConfigurationService
    {
        Task<ResponseList<TROLLY_ORDER_DTO>> GetTrollyOrder(string productionDate, int sequencePlan, string trollyGroup);
        Task<ResponseDTO<TROLLY_LOT_DTO>> GetLotInTrolly(string lotNumber);
        Task<ResponseDTO<string>> SetOrderTrolly(string productionDate, int sequencePlan, IEnumerable<string> lotNumberList);
    }
} 