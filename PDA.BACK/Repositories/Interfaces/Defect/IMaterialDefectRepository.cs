using HWMX.DotNet.ORM;
namespace Repositories.Interfaces.Defect
{
    public interface IMaterialDefectRepository
    {
        Task<ResponseProcedure> GetLotInfo(string LotNo);
        Task<ResponseProcedure> SetMatDefectRequest(string LotNo, string StorageCd, string DEF_M_CD, string DEF_D_CD, string UserId);
    }
} 