using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IOperDefectRegRepository
    {
        Task<ResponseProcedure> GetSerialNoInfo(string Factory, string LineCode, string MatId, string SerialNo);

        Task<ResponseProcedure> SetDefectRequest(string SerialNo, string OPCode, string MatID, string DEF_M_CD, string DEF_D_CD, string UserId);
    }
} 