using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location; 
namespace Repositories.Repository.Location
{
    public class TrollyConfigurationRepository(HWMENMESContext _context) : ITrollyConfigurationRepository
    {
        public async Task<ResponseProcedure> GetOrderTrolly(string prodDate, int sequencePlan, string trollyGroup)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_TROLLY_ORDER_INFO")
               .Input("P_PROD_DATE", OracleDbType.Varchar2, prodDate)
               .Input("P_PLAN_SEQ", OracleDbType.Varchar2, sequencePlan)
               .Input("P_TROLLY_GROUP", OracleDbType.Varchar2, trollyGroup)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetOrderTrolly(string prodDate, int sequencePlan, IEnumerable<string> lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_TROLLY_ORDER")
               .Input("P_PROD_DATE", OracleDbType.Varchar2, prodDate)
               .Input("P_PLAN_SEQ", OracleDbType.Varchar2, sequencePlan)
               .Input("P_LOT_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 