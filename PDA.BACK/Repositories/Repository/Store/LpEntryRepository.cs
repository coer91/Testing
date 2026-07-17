using Oracle.ManagedDataAccess.Client;
 using Repositories.Interfaces.Store;
using Repositories.Database; 
using HWMX.DotNet.ORM;

namespace Repositories.Repository.Store
{
    public class LpEntryRepository(HWMENMESContext _context) : ILpEntryRepository
    { 

        public async Task<ResponseProcedure> GetLPStockIn(string vbelg)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_LP_STOCK_IN")
               .Input("P_VBELG" , OracleDbType.Varchar2, vbelg) 
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetLPStockIn(string vbelg, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_LP_STOCK_IN")
               .Input("P_VBELG"      , OracleDbType.Varchar2, vbelg)
               .Input("P_USER_ID"    , OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        } 
    }
}