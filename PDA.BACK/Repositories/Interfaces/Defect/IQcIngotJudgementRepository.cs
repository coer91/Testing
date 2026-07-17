using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IQcIngotJudgementRepository
    {
        Task<ResponseProcedure> GetMaterialInfo_QC(string Serial);
        Task<ResponseProcedure> SetIngotQcJudge(string MatNo, string MatId, string LastOp, int JudgeWeight, string UserId);
    }
} 