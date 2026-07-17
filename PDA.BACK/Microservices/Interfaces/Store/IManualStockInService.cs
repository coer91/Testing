using HWMX.DotNet; 

namespace Microservices.Interfaces.Store
{
    public interface IManualStockInService
    {
        Task<ResponseDTO<string>> SetManualIn(string lotNumber, string partNumber, string qty, string unit, string prodDate, string eoNumber, string company, string warehouse, string model);
    }
} 