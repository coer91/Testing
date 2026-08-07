using HWMX.DotNet.ORM; 
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Delivery; 
namespace Repositories.Repository.Delivery
{
    public class PermitGateRepository(HWMENMESContext _context) : IPermitGateRepository
    {

        public async Task<ResponseProcedure> GetGatePermit(string shippingNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GET_GATE_PERMIT")
               .Input("P_SHIP_NO", OracleDbType.Varchar2, shippingNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetGatePermit(string gatePos, string shippingNumber, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("SET_GATE_PERMIT")
               .Input("P_GATE_POS", OracleDbType.Varchar2, gatePos)
               .Input("P_SHIP_NO", OracleDbType.Varchar2, shippingNumber)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }

        public async Task<ResponseProcedure> GetGatePermitDetail(string shippingNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GET_GATE_PERMIT_DETAIL")
               .Input("P_SHIP_NO", OracleDbType.Varchar2, shippingNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }
    }
}
