using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect; 

namespace Repositories.Repository.Defect
{
    public class OperDefectRegRepository(HWMENMESContext _context) : IOperDefectRegRepository
    {
        public async Task<ResponseProcedure> GetSerialNoInfo(string Factory, string LineCode, string MatId, string SerialNo)
        {
                        return await Procedure
               .Oracle(_context)
               .Package("PKG_WEB_QC")
               .Procedure("PRC_QC_OPER_FAULTY_DTL2_SERIAL")
                .Input("P_FACTORY", OracleDbType.Varchar2, Factory)
                .Input("P_LINE_CODE", OracleDbType.Varchar2, LineCode)
                .Input("P_MAT_ID", OracleDbType.Varchar2, MatId)
                .Input("P_ERR_NO", OracleDbType.Varchar2, SerialNo)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }

        public async Task<ResponseProcedure> SetDefectRequest(string SerialNo, string OPCode, string MatID, string DEF_M_CD, string DEF_D_CD, string UserId)
        {
                        return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_DM")
               .Procedure("SET_DEFECT_REQUEST")
                .Input("P_SERIAL_NO", OracleDbType.Varchar2, SerialNo)
                .Input("P_OP_CODE", OracleDbType.Varchar2, OPCode)
                .Input("P_MAT_ID", OracleDbType.Varchar2, MatID)
                .Input("P_DEF_M_CD", OracleDbType.Varchar2, DEF_M_CD)
                .Input("P_DEF_D_CD", OracleDbType.Varchar2, DEF_D_CD)
                .Input("P_USER_ID", OracleDbType.Varchar2, UserId)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 