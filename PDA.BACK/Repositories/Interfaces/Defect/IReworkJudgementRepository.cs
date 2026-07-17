using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IReworkJudgementRepository
    {
        Task<ResponseProcedure> GetReworkInfo(string SerialNo, string Type);

        Task<ResponseProcedure> SetQmRework(string ErrNo, string SerialNo, string UserId);
    }
} 