using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location; 
namespace Repositories.Repository.Location
{
    public class TrollyConfigurationRepository(HWMENMESContext _context) : ITrollyConfigurationRepository
    {
        public async Task<ResponseProcedure> GetTrollyOrder(string prodDate, int sequencePlan, string trollyGroup)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("GET_TROLLY_ORDER")
               .Input("P_PROD_DATE",    OracleDbType.Varchar2, prodDate)
               .Input("P_PLAN_SEQ",     OracleDbType.Varchar2, sequencePlan)
               .Input("P_TROLLY_GROUP", OracleDbType.Varchar2, trollyGroup)
               .Output("IO_CURSOR",     OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetLotInTrolly(string lotNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("GET_LOT_IN_TROLLY")
               .Input("P_LOT_NO",   OracleDbType.Varchar2, lotNumber) 
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetOrderTrolly(string prodDate, int sequencePlan, IEnumerable<string> lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("SET_ORDER_TROLLY")
               .Input("P_PROD_DATE", OracleDbType.Varchar2, prodDate)
               .Input("P_PLAN_SEQ", OracleDbType.Varchar2, sequencePlan)
               .Input("P_LOT_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 