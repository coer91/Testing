using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Store;

namespace Repositories.Repository.Store
{
    public class CcEntryRepository(HWMENMESContext _context) : ICcEntryRepository
    {
        public async Task<ResponseProcedure> GetCcEntry(string deliveryNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("GET_CC_ENTRY")
               .Input("P_DELIVERY_NO", OracleDbType.Varchar2, deliveryNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetCcEntry(string deliveryNumber, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_CC_ENTRY")
               .Input("P_DELIVERY_NO", OracleDbType.Varchar2, deliveryNumber)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 