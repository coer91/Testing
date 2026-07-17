using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IReimpregnationRepository
    {
        Task<ResponseProcedure> GetLeakData(string MatNo);
        Task<ResponseProcedure> SetReimpHist(string MatNo, string UserId);
    }
} 