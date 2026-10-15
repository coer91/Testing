using Oracle.ManagedDataAccess.Client;
using Repositories.Interfaces; 
using Repositories.Database;
using HWMX.DotNet.ORM;

namespace Repositories.Repository
{
    public class DataSessionRepository(HWMENMESContext _context) : IDataSessionRepository
    { 

        public async Task<ResponseProcedure> GetDataSession(string pageCode, string operation, string user)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("GET_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode)
                .Input("P_OPERATION", OracleDbType.Varchar2, operation)
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetLastDataSession(string pageCode, string user)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("GET_LAST_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode) 
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetDetailDataSession(string pageCode, string detail)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("GET_DETAIL_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode)
                .Input("P_DETAIL", OracleDbType.Varchar2, detail)
                .Output("IO_MESSAGE", OracleDbType.Varchar2)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> AddDataSession(string pageCode, string operation, string detail, string json, string user)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("ADD_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode)
                .Input("P_OPERATION", OracleDbType.Varchar2, operation)
                .Input("P_DETAIL", OracleDbType.Varchar2, detail)
                .Input("P_DETAIL_JSON", OracleDbType.Varchar2, json)
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_MESSAGE", OracleDbType.Varchar2)
                .Exec();
        }


        public async Task<ResponseProcedure> SetDataSession(string pageCode, string operation, string[] detailArray, string[] jsonArray, string user)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("ADD_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode)
                .Input("P_OPERATION", OracleDbType.Varchar2, operation)
                .Input("P_DETAIL", "ARRAY_STRING", detailArray)
                .Input("P_DETAIL_JSON", "ARRAY_STRING", jsonArray)
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_MESSAGE", OracleDbType.Varchar2)
                .Exec();
        }


        public async Task<ResponseProcedure> DeleteDataSession(string pageCode, string operation, string detail, string user)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("DELETE_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode)
                .Input("P_OPERATION", OracleDbType.Varchar2, operation)
                .Input("P_DETAIL", OracleDbType.Varchar2, detail) 
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_MESSAGE", OracleDbType.Varchar2)
                .Exec();
        }


        public async Task<ResponseProcedure> ClearDataSession(string pageCode, string operation, string user)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_DATA_SESSION")
                .Procedure("CLEAR_DATA_SESSION")
                .Input("P_PAGE_CODE", OracleDbType.Varchar2, pageCode)
                .Input("P_OPERATION", OracleDbType.Varchar2, operation)
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_MESSAGE", OracleDbType.Varchar2)
                .Exec();
        }
    }
} 