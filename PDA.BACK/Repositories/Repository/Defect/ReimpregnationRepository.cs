using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect; 

namespace Repositories.Repository.Defect
{
    public class ReimpregnationRepository(HWMENMESContext _context) : IReimpregnationRepository
    {
        public async Task<ResponseProcedure> GetLeakData(string MatNo)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("GET_MAT_LEAK_DATA")
                .Input("P_MAT_NO", OracleDbType.Varchar2, MatNo)
                .Output("P_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }

        public async Task<ResponseProcedure> SetReimpHist(string MatNo, string UserId)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("SET_REIMP_HIST")
                .Input("P_MAT_NO", OracleDbType.Varchar2, MatNo)
                .Input("P_USER_ID", OracleDbType.Varchar2, UserId)
                .Output("P_RETURN_MSG", OracleDbType.Varchar2)
                .Exec();
        }
    }
} 