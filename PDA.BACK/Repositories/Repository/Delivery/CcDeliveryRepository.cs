using Repositories.Interfaces.Delivery;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using HWMX.DotNet.ORM;

namespace Repositories.Repository.Delivery
{
    public class CcDeliveryRepository(HWMENMESContext _context) : ICcDeliveryRepository
    {
        public async Task<ResponseProcedure> GetGlovisDeliveryNumberList()
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CC")
               .Procedure("GET_GLOVIS_DLV_NO_LIST") 
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetLotInfoCC(string lotNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CC")
               .Procedure("GET_LOT_INFO_CC")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> DeliveryOrder(string deliveryNumber, string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CC")
               .Procedure("SET_GLOVIS_DLV_ORDER")
               .Input("P_DLV_NO", OracleDbType.Varchar2, deliveryNumber)
               .Input("P_LOT_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Input("P_PARTIAL_OR_COMP", OracleDbType.Varchar2, "C")
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 