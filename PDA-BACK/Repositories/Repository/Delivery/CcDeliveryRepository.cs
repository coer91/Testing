using Repositories.Interfaces.Delivery;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using HWMX.DotNet.ORM;

namespace Repositories.Repository.Delivery
{
    public class CcDeliveryRepository(HWMENMESContext _context) : ICcDeliveryRepository
    {
        public async Task<ResponseProcedure> GetGlovisDeliveryList()
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GET_GLOVIS_DELIVERY_LIST") 
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetLotInformationGlovis(string lotNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GET_LOT_INFORMATION_GLOVIS")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GenerateGlovisDelvNum(string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("GENERATE_GLOVIS_DELV_NUM")
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> DeliveryGlovisOrder(string deliveryNumber, string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_DELIVERY")
               .Procedure("DELIVERY_GLOVIS_ORDER")
               .Input("P_DLV_NO", OracleDbType.Varchar2, deliveryNumber)
               .Input("P_LOT_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 