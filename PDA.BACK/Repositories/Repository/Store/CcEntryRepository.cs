using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Store;

namespace Repositories.Repository.Store
{
    public class CcEntryRepository(HWMENMESContext _context) : ICcEntryRepository
    {
        public async Task<ResponseProcedure> GetCCStockIn(string deliveryNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CC")
               .Procedure("GET_CC_OUT_INFO")
               .Input("P_DELIVERY_NO", OracleDbType.Varchar2, deliveryNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }
        public async Task<ResponseProcedure> SetCCStockIn(string deliveryNumber, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CC")
               .Procedure("SET_CC_STOCK_IN")
               .Input("P_DELIVERY_NO", OracleDbType.Varchar2, deliveryNumber)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }


    }
} 