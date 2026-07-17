using HWMX.DotNet;

namespace Microservices.Interfaces.Defect
{
    public interface IQcIngotJudgementService
    {
        Task<ResponseDTO<dynamic>> GetMaterialInfo_QC(string Serial);
        Task<ResponseDTO<dynamic>> SetIngotQcJudge(string Serial, string MatId, string LastOp, int JudgeWeight);
    }
} 