using HWMX.DotNet;

namespace Microservices.Interfaces.Location
{
    public interface ITrollyConfigurationService
    {
        Task<ResponseList<dynamic>> GetOrderTrolly(string productionDate, int sequencePlan, string trollyGroup);
        Task<ResponseDTO<string>> SetOrderTrolly(string productionDate, int sequencePlan, IEnumerable<string> lotNumberList);
    }
} 