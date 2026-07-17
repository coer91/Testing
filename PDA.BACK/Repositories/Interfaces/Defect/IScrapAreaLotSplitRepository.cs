using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IScrapAreaLotSplitRepository
    {
        Task<ResponseProcedure> GetScrapAreaLotInfo(string LotNo);
    }
} 