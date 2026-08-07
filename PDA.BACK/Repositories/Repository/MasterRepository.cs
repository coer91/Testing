using Oracle.ManagedDataAccess.Client; 
using Repositories.Interfaces;
using Repositories.Database; 
using HWMX.DotNet.ORM;

namespace Repositories.Repository
{
    public class MasterRepository(HWMENMESContext _context) : IMasterRepository
    {
        public async Task<ResponseProcedure> GetLotInformation(string lotNumber)
        {
            return await Procedure
               .Oracle(_context) 
               .Package("PKG_HWMX_MASTER")
               .Procedure("GET_LOT_INFORMATION")
               .Input("P_LOT_NUMBER", OracleDbType.Varchar2, lotNumber)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetLotListByCaseLabel(string caseLabel, string storageCode = "")
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_LOT_LIST_BY_CASE_LABEL")
                .Input("P_CASE_LABEL_ID", OracleDbType.Varchar2, caseLabel)
                .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetLotListByLocation(string location)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_LOT_LIST_BY_LOCATION")
                .Input("P_LOC_NO", OracleDbType.Varchar2, location) 
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetStorageList(string factory = "", string storageType = "")
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_STORAGE_LIST")
                .Input("P_FACTORY", OracleDbType.Varchar2, factory)
                .Input("P_STORAGE_TYPE", OracleDbType.Varchar2, storageType)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetLocation(string location = "", string rack = "", string rackType = "")
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_LOCATION")
                .Input("P_LOC_NO", OracleDbType.Varchar2, location)
                .Input("P_RACK", OracleDbType.Varchar2, rack)
                .Input("P_RACK_TYPE", OracleDbType.Varchar2, rackType)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetLocationByMaterial(string partNumber)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_LOCATION_BY_MATERIAL")
                .Input("IO_CURSOR", OracleDbType.Varchar2, partNumber)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetPrinterList(string printer = null)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_PRINTER_LIST")
                .Input("P_PRINTER_NAME", OracleDbType.Varchar2, printer)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        } 
    }
} 