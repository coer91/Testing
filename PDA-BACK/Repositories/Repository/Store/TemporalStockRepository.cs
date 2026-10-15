using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Store;

namespace Repositories.Repository.Store
{
    public class TemporalStockRepository(HWMENMESContext _context) : ITemporalStockRepository
    {

        public async Task<ResponseProcedure> GetTemporalStock(string operation)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("GET_STOCK_TEMPORAL")
               .Input("P_OPERATION", OracleDbType.Varchar2, operation)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetTemporalStock(
            string operation,
            string barcode,
            string lotNumber,
            string partNumber,
            string eoNumber,
            int qty,
            string unit,
            string storageCode,
            string vendorCode,
            string productionDate,
            string erpCode,
            string deliverySlip,
            string deliveryItem,
            string category,
            string model,
            string corp,
            string ship,
            string container,
            string user
        ) {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_STOCK_TEMPORAL")
               .Input("P_OPERATION", OracleDbType.Varchar2, operation)
               .Input("P_BARCODE", OracleDbType.Varchar2, barcode)
               .Input("P_LOT_NUMBER", OracleDbType.Varchar2, lotNumber)
               .Input("P_PART_NUMBER", OracleDbType.Varchar2, partNumber)
               .Input("P_EO_NUMBER", OracleDbType.Varchar2, eoNumber)
               .Input("P_QTY", OracleDbType.Int32   , qty)
               .Input("P_UNIT", OracleDbType.Varchar2, unit)
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_VENDOR_CODE", OracleDbType.Varchar2, vendorCode)
               .Input("P_PRODUCTION_DATE", OracleDbType.Varchar2, productionDate)
               .Input("P_ERP_CODE", OracleDbType.Varchar2, erpCode)
               .Input("P_DELIVERY_SLIP", OracleDbType.Varchar2, deliverySlip)
               .Input("P_DELIVERY_ITEM", OracleDbType.Varchar2, deliveryItem)
               .Input("P_CATEGORY", OracleDbType.Varchar2, category)
               .Input("P_MODEL", OracleDbType.Varchar2, model)
               .Input("P_CORP", OracleDbType.Varchar2, corp)
               .Input("P_SHIP", OracleDbType.Varchar2, ship)
               .Input("P_CONTAINER", OracleDbType.Varchar2, container)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2) 
               .Exec();
        }


        public async Task<ResponseProcedure> DeleteTemporalStock(string operation, string barcode, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("DELETE_STOCK_TEMPORAL")
               .Input("P_OPERATION", OracleDbType.Varchar2, operation)
               .Input("P_BARCODE", OracleDbType.Varchar2, barcode)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> ClearTemporalStock(string operation, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("CLEAR_STOCK_TEMPORAL")
               .Input("P_OPERATION", OracleDbType.Varchar2, operation)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 