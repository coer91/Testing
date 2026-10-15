using Oracle.ManagedDataAccess.Client;
using Repositories.Interfaces.Store; 
using Repositories.Database;
using HWMX.DotNet.ORM;

namespace Repositories.Repository.Store
{
    public class GkdEntryRepository(HWMENMESContext _context) : IGkdEntryRepository
    { 

        public async Task<ResponseProcedure> GetKDLotInfo(string lotNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("GET_GKD_ENTRY")
               .Input("P_LOT_NO",   OracleDbType.Varchar2, lotNumber)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        } 


        public async Task<ResponseProcedure> SetKdStockIn(string lotNumber, string partNumber, string qty, string unit, string productionDate, string eoNumber, string vendorCode, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_GKD_ENTRY")
               .Input("P_LOT_NO",    OracleDbType.Varchar2, lotNumber)
               .Input("P_PART_NO",   OracleDbType.Varchar2, partNumber)
               .Input("P_QTY",       OracleDbType.Varchar2, qty)
               .Input("P_UNIT",      OracleDbType.Varchar2, unit)
               .Input("P_PROD_DATE", OracleDbType.Varchar2, productionDate)
               .Input("P_EO_NO",     OracleDbType.Varchar2, eoNumber)
               .Input("P_VD_CD",     OracleDbType.Varchar2, vendorCode)
               .Input("P_WH_CD",     OracleDbType.Varchar2, string.Empty)
               .Input("P_MODEL",     OracleDbType.Varchar2, string.Empty)
               .Input("P_USER_ID",   OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> SetKdStockAoneIn(string vbelg, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_GKD_ENTRY_AONE")
               .Input("P_VBELG",     OracleDbType.Varchar2, vbelg)
               .Input("P_USER_ID",   OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
}