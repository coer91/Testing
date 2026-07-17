using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Lot;

namespace Repositories.Repository.Lot
{
    public class SplitRepository(HWMENMESContext _context) : ISplitRepository
    {
        public async Task<ResponseProcedure> SplitLot(string lotNumber, int qty, string paperType, string printer, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_LOT_SPLIT")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Input("P_SPLIT_QTY", OracleDbType.Varchar2, qty)
               .Input("P_PRINT_CT", OracleDbType.Varchar2, paperType)
               .Input("P_PRINTER", OracleDbType.Varchar2, printer)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_NEW_LOT_NO", OracleDbType.Varchar2)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 