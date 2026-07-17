using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect;

namespace Repositories.Repository.Defect
{
    public class QcIngotJudgementRepository(HWMENMESContext _context) : IQcIngotJudgementRepository
    {
        public async Task<ResponseProcedure> GetMaterialInfo_QC(string Serial)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("GET_SERIAL_INFO_INGOT")
                .Input("P_SERIAL_NO", OracleDbType.Varchar2, Serial)
                .Output("P_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }

        public async Task<ResponseProcedure> SetIngotQcJudge(string Serial, string MatId, string LastOp, int JudgeWeight, string UserId)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("SET_INGOT_QC_JUDGE")
                .Input("P_SERIAL_NO", OracleDbType.Varchar2, Serial)
                .Input("P_MAT_ID", OracleDbType.Varchar2, MatId)
                .Input("P_LAST_STATION", OracleDbType.Varchar2, LastOp)
                .Input("P_JUDGE_WEIGHT", OracleDbType.Int32, JudgeWeight)
                .Input("P_USER_ID", OracleDbType.Varchar2, UserId)
                .Output("P_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }
    }
}