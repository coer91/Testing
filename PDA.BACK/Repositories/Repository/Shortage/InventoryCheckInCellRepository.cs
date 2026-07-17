using HWMX.DotNet.ORM; 
using Oracle.ManagedDataAccess.Client; 
using Repositories.Interfaces.Shortage; 
using Repositories.Database;

namespace Repositories.Repository.Shortage
{
    public class InventoryCheckInCellRepository(HWMENMESContext _context) : IInventoryCheckInCellRepository
    { 

        public async Task<ResponseProcedure> GetCaseLotInfo(string caseLabelId)
        { 
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_CASE_LOT_INFO")
               .Input("P_CASE_LABEL_ID", OracleDbType.Varchar2, caseLabelId) 
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }

        public async Task<ResponseProcedure> SetInventoryCellMulti(string user, string location, string[] lotLocationList)
        {
            return await Procedure
                .Oracle(_context)
                .Package("MESADMIN.PKG_MES_PDA_SM")
                .Procedure("SET_INVENTORY_CELL_MULTI")
                .Input("P_LOC_NO", OracleDbType.Varchar2, location)
                .Input("P_MAT_LOT_NO", "ARR_VALUE", lotLocationList)
                .Input("P_USER_ID", OracleDbType.Varchar2, user)
                .Output("P_RETURN_MSG", OracleDbType.Varchar2)
                .Exec();
        }


    } 
}