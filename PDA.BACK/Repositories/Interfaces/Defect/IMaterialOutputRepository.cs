using HWMX.DotNet.ORM;  

namespace Repositories.Interfaces.Defect
{
    public interface IMaterialOutputRepository
    {
        Task<ResponseProcedure> SetScrapAreaOutput(string ErrNo, string LotNo, string UserId);
        Task<ResponseProcedure> GetNGStatusInfoOut(string LotNo, string LotType);
    }
} 