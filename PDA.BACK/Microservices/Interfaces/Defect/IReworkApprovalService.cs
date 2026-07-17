using Azure;
using HWMX.DotNet;
using HWMX.DotNet.ORM;

namespace Microservices.Interfaces.Defect
{
    public interface IReworkApprovalService
    {
        Task<ResponseDTO<dynamic>> GetReworkInfo(string SerialNo, string Type);
        Task<ResponseDTO<string>> SetQmReworkApprov(string ErrNo, string NGNotes);
    }
} 