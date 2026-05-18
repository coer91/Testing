using Oracle.ManagedDataAccess.Client;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using HWMX.DotNet.ORM; 

namespace Repositories.HWMENMES.Repository
{
    public class PDA_Repository(HWMENMESContext _context) : PDA_IRepository
    {
        public async Task<ResponseProcedure> GET_LOGIN_INFO(string user, string password)
        { 
            return await Procedure
                .Oracle(_context)    
                .SetPackage("PKG_MES_PDA")
                .SetProcedure("GET_LOGIN_INFO")
                .AddInput("P_USER_ID" , OracleDbType.Varchar2, user)
                .AddInput("P_USER_PW" , OracleDbType.Varchar2, password)
                .AddOutput("P_CURSOR" , OracleDbType.RefCursor)
                .AddOutput("P_CURSOR2", OracleDbType.RefCursor)
                .ExecAsync();
        }
    }
}