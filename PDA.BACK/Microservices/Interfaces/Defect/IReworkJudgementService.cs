using HWMX.DotNet;
using HWMX.DotNet.ORM;

namespace Microservices.Interfaces.Defect
{
    public interface IReworkJudgementService
    {
        Task<ResponseDTO<dynamic>> GetReworkInfo(string SerialNo, string Type);
        Task<ResponseDTO<string>> SetQmRework(string ErrNo, string SerialNo);
    }
} 