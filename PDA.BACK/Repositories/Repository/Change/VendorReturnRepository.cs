using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Change; 

namespace Repositories.Repository.Change
{
    public class VendorReturnRepository(HWMENMESContext _context) : IVendorReturnRepository
    {

        public async Task<ResponseProcedure> GetReturnPO(string Vendor)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_RET_PO_LIST")
               .Input("P_VEN_ID", OracleDbType.Varchar2, Vendor)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }

        public async Task<ResponseProcedure> SetRetVendor(string RetPO, List<string> list_LOT_No, string userId)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_RET_VENDOR")
               .Input("P_RET_PO", OracleDbType.Varchar2, RetPO)
               .Input("P_LOT_NO", OracleDbType.Array, list_LOT_No)
               .Input("P_USER_ID", OracleDbType.Varchar2, userId)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }

        public async Task<ResponseProcedure> GetReturnRequest(string RetPO)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_RET_REQUEST")
               .Input("P_RET_PO", OracleDbType.Varchar2, RetPO)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }
    }
} 