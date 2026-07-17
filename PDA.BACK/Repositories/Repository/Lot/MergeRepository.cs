using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Lot; 

namespace Repositories.Repository.Lot
{
    public class MergeRepository(HWMENMESContext _context) : IMergeRepository
    {
        public async Task<ResponseProcedure> MergeLot(string paperType, string printer, string lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_LOT_MERGE")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumberList)
               .Input("P_PRINT_CNT", OracleDbType.Varchar2, paperType)
               .Input("P_PRINTER", OracleDbType.Varchar2, printer) 
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2) 
               .Exec();
        }
    }
} 