using Azure;
using HWMX.DotNet;
using HWMX.DotNet.ORM;

namespace Microservices.Interfaces.Defect
{
    public interface IMaterialInputService
    {
        Task<ResponseDTO<string>> SetScrapAreaInput(string ErrNo, string LotNo);
        Task<ResponseDTO<string>> GetNGStatusInfo(string LotNo, string LotType);
    }
} 