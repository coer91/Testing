using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IReworkApprovalRepository
    {
        Task<ResponseProcedure> GetReworkInfo(string SerialNo, string Type);
        Task<ResponseProcedure> SetQmReworkApprov(string ErrNo, string NGNotes, string UserId);
    }
} 