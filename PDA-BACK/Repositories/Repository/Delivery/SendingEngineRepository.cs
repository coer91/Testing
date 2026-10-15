using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Delivery;

namespace Repositories.Repository.Delivery
{
    public class SendingEngineRepository(HWMENMESContext _context) : ISendingEngineRepository
    {
        public async Task<ResponseProcedure> GetOrderList(string station, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GET_GLOVIS_ORDER")
               .Input("P_STATION_CODE", OracleDbType.Varchar2, station)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetEngineByOrder(string orderNumber, string station, string engineType, string engineNumber, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GET_ENGINE_BY_ORDER")
               .Input("P_ORDER_NUMBER", OracleDbType.Varchar2, orderNumber)
               .Input("P_STATION_CODE", OracleDbType.Varchar2, station)
               .Input("P_ENGINE_TYPE", OracleDbType.Varchar2, engineType)
               .Input("P_ENGINE_NUMBER", OracleDbType.Varchar2, engineNumber)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)  
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetGlovisOrder(string orderNumber, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("SET_GLOVIS_ORDER") 
               .Input("P_ORDER_NUMBER", OracleDbType.Varchar2, orderNumber)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        } 
    }
}
