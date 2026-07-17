using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IMaterialInputRepository
    {
        Task<ResponseProcedure> SetScrapAreaInput(string ErrNo, string LotNo, string UserId);
        Task<ResponseProcedure> GetNGStatusInfo(string LotNo, string LotType);
    }
} 