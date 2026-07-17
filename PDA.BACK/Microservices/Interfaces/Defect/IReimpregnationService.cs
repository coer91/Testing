using HWMX.DotNet;

namespace Microservices.Interfaces.Defect
{
    public interface IReimpregnationService
    {
        Task<ResponseDTO<dynamic>> GetLeakData(string MatNo);
        Task<ResponseDTO<string>> SetReimpHist(string MatNo);
    }
} 