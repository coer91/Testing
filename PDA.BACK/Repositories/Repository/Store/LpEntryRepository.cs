using Oracle.ManagedDataAccess.Client;
 using Repositories.Interfaces.Store;
using Repositories.Database; 
using HWMX.DotNet.ORM;

namespace Repositories.Repository.Store
{
    public class LpEntryRepository(HWMENMESContext _context) : ILpEntryRepository
    { 

        public async Task<ResponseProcedure> GetLpEntry(string vbelg)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("GET_LP_ENTRY")
               .Input("P_VBELG", OracleDbType.Varchar2, vbelg) 
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetLpEntry(string vbelg, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_LP_ENTRY")
               .Input("P_VBELG", OracleDbType.Varchar2, vbelg)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        } 
    }
}