using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface ITrollyConfigurationRepository
    {
        Task<ResponseProcedure> GetTrollyOrder(string prodDate, int sequencePlan, string trollyGroup);
        Task<ResponseProcedure> GetLotInTrolly(string lotNumber);
        Task<ResponseProcedure> SetOrderTrolly(string prodDate, int sequencePlan, IEnumerable<string> lotNumberList, string user);
    }
} 