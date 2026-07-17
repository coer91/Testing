using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect; 

namespace Repositories.Repository.Defect
{
    public class ReworkApprovalRepository(HWMENMESContext _context) : IReworkApprovalRepository
    {
        public async Task<ResponseProcedure> GetReworkInfo(string SerialNo, string Type)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("GET_QM_REWORK_INFO")
                .Input("P_SERIAL_NO", OracleDbType.Varchar2, SerialNo)
                .Input("P_TYPE", OracleDbType.Varchar2, Type)
                .Output("P_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }

        public async Task<ResponseProcedure> SetQmReworkApprov(string ErrNo, string NGNotes, string UserId)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("SET_QM_REWORK_APPROV")
                .Input("P_ERR_NO", OracleDbType.Varchar2, ErrNo)
                .Input("P_NG_NOTES", OracleDbType.Varchar2, NGNotes)
                .Input("P_USER_ID", OracleDbType.Varchar2, UserId)
                .Output("P_RETURN_MSG", OracleDbType.Varchar2)
                .Exec();
        }
    }
} 