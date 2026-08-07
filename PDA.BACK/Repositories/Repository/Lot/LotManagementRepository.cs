using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Lot; 

namespace Repositories.Repository.Lot
{
    public class LotManagementRepository(HWMENMESContext _context) : ILotManagementRepository
    {
        public async Task<ResponseProcedure> Join(string paperType, string printer, string lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_LOT")
               .Procedure("JOIN_LOT")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumberList)
               .Input("P_PRINT_CNT", OracleDbType.Varchar2, paperType)
               .Input("P_PRINTER", OracleDbType.Varchar2, printer) 
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2) 
               .Exec();
        }


        public async Task<ResponseProcedure> Split(string lotNumber, int qty, string paperType, string printer, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_LOT")
               .Procedure("SPLIT_LOT")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Input("P_SPLIT_QTY", OracleDbType.Varchar2, qty)
               .Input("P_PRINT_CT", OracleDbType.Varchar2, paperType)
               .Input("P_PRINTER", OracleDbType.Varchar2, printer)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_NEW_LOT_NO", OracleDbType.Varchar2)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 