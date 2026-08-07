using HWMX.DotNet.ORM; 
using Oracle.ManagedDataAccess.Client;
using Repositories.Database; 
using Repositories.Interfaces.Lot; 

namespace Repositories.Repository.Lot
{
    public class InventoryInspectionRepository(HWMENMESContext _context) : IInventoryInspectionRepository
    {

        public async Task<ResponseProcedure> GetInspectionNumberList(string storageCode, int range = 15)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_LOT")
               .Procedure("GET_INSPECTION_NUMBER_LIST")
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_RANGE", OracleDbType.Int32, range)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> CreateInspectionNumber(string storageCode, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_LOT")
               .Procedure("CREATE_INSPECTION_NUMBER")
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_VALUE", OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> MoveLot(string lotNumber, string storageCode, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_LOT")
               .Procedure("MOVE_LOT")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> SetInspectionLot(string storageCode, string inspection, string[] lotList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_LOT")
               .Procedure("SET_LOT_INSPECTION")
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_INSP_NO", OracleDbType.Varchar2, inspection)
               .Input("P_LOT_NO", "ARR_VALUE", lotList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
}