using Azure;
using HWMX.DotNet;

namespace Microservices.Interfaces.Defect
{
    public interface IOperDefectRegService
    {
        Task<ResponseDTO<dynamic>> GetSerialNoInfo(string LineCode, string MatId, string SerialNo);
        Task<ResponseDTO<string>> SetDefectRequest(string SerialNo, string OPCode, string MatID, string DEF_M_CD, string DEF_D_CD);
    }
} 