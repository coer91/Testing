using Azure;
using HWMX.DotNet;
using HWMX.DotNet.ORM;

namespace Microservices.Interfaces.Defect
{
    public interface IMaterialOutputService
    {
        Task<ResponseDTO<string>> SetScrapAreaOutput(string ErrNo, string LotNo);
        Task<ResponseDTO<string>> GetNGStatusInfoOut(string LotNo, string LotType);

    }
} 