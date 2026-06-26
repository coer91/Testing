using Oracle.ManagedDataAccess.Client;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using HWMX.DotNet.ORM; 

namespace Repositories.HWMENMES.Repository
{
    public class PDA_Repository(HWMENMESContext _context) : IPDA_Repository
    {
        public async Task<ResponseProcedure> GET_LOGIN_INFO(string user, string password)
        { 
            return await Procedure
                .Oracle(_context)    
                .Package("PKG_MES_PDA")
                .Procedure("GET_LOGIN_INFO")
                .Input("P_USER_ID" , OracleDbType.Varchar2, user)
                .Input("P_USER_PW" , OracleDbType.Varchar2, password)
                .Output("P_CURSOR" , OracleDbType.RefCursor)
                .Output("P_CURSOR2", OracleDbType.RefCursor)
                .Exec();
        }
    }
}