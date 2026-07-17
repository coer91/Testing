using HWMX.DotNet;
using HWMX.DotNet.ORM;

namespace Microservices.Interfaces.Defect
{
    public interface IMaterialDefectService
    {
        Task<ResponseList<dynamic>> GetLotInfo(string LotNo);
        Task<ResponseDTO<string>> SetMatDefectRequest(string LotNo, string StorageCd, string DEF_M_CD, string DEF_D_CD);
    }
} 