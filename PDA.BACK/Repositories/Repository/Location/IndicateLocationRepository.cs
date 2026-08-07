using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location;

namespace Repositories.Repository.Location
{
    public class IndicateLocationRepository(HWMENMESContext _context) : IIndicateLocationRepository
    {
        public async Task<ResponseProcedure> GetLotListByCaseLabel(string caseLabel)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("GET_LOT_LIST_BY_CASE_LABEL")
               .Input("P_CASE_LABEL_ID", OracleDbType.Varchar2, caseLabel)
               .Output("IO_CURSOR",      OracleDbType.RefCursor)
               .Exec();
        }  


        public async Task<ResponseProcedure> GetMaterialByLocation(string location)
        {
            return await Procedure
              .Oracle(_context)
              .Package("PKG_HWMX_PDA_LOCATION")
              .Procedure("GET_MATERIAL_BY_LOCATION")
              .Input("P_LOCATION", OracleDbType.Varchar2, location)
              .Output("IO_CURSOR", OracleDbType.RefCursor)
              .Exec();
        }


        public async Task<ResponseProcedure> SetLotsInLocation(string storageCode, string location, string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("SET_LOTS_IN_LOCATION") 
               .Input("P_LOT_NO",       "ARR_VALUE",        lotNumberList)
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_LOC_NO",       OracleDbType.Varchar2, location)
               .Input("P_USER_ID",      OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE",    OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> SetInventoryCell(string user, string location, string[] lotLocationList)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_HWMX_PDA_LOCATION")
                .Procedure("SET_INVENTORY_CELL")
                .Input("P_LOC_NO", OracleDbType.Varchar2, location)
                .Input("P_MAT_LOT_NO", "ARR_VALUE", lotLocationList)
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("IO_MESSAGE", OracleDbType.Varchar2)
                .Exec();
        }
    }
} 