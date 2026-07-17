using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect; 

namespace Repositories.Repository.Defect
{
    public class MaterialInputRepository(HWMENMESContext _context) : IMaterialInputRepository
    {
        public async Task<ResponseProcedure> SetScrapAreaInput(string ErrNo, string LotNo, string UserId)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_QM")
               .Procedure("SET_SCRAP_AREA_INPUT")
               .Input("P_ERR_NO", OracleDbType.Varchar2, ErrNo)
               .Input("P_LOT_NO", OracleDbType.Varchar2, LotNo)
               .Input("P_USER_ID", OracleDbType.Varchar2, UserId)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }

        public async Task<ResponseProcedure> GetNGStatusInfo(string LotNo, string LotType)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_QM")
               .Procedure("GET_SCRAP_DEFECT_INFO")
               .Input("P_LOT_NO", OracleDbType.Varchar2, LotNo)
               .Input("P_LOT_TYPE", OracleDbType.Varchar2, LotType)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 