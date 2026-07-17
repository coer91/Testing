using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect;
namespace Repositories.Repository.Defect
{
    public class MaterialDefectRepository(HWMENMESContext _context) : IMaterialDefectRepository
    {
        public async Task<ResponseProcedure> GetLotInfo(string LotNo)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_LOT_INFO")
               .Input("P_LOT_NO", OracleDbType.Varchar2, LotNo)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }

        public async Task<ResponseProcedure> SetMatDefectRequest(string LotNo, string StorageCd, string DEF_M_CD, string DEF_D_CD, string UserId)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_DM")
               .Procedure("SET_MAT_DEFECT_REQUEST")
               .Input("P_LOT_NO", OracleDbType.Varchar2, LotNo)
               .Input("P_STORAGE_CD", OracleDbType.Varchar2, StorageCd)
               .Input("P_DEF_M_CD", OracleDbType.Varchar2, DEF_M_CD)
               .Input("P_DEF_D_CD", OracleDbType.Varchar2, DEF_D_CD)
               .Input("P_REG_ID", OracleDbType.Varchar2, UserId)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
}