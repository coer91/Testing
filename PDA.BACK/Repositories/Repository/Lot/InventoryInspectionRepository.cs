using HWMX.DotNet.ORM;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database; 
using Repositories.Interfaces.Lot;
using System.Linq.Expressions;

namespace Repositories.Repository.Lot
{
    public class InventoryInspectionRepository(HWMENMESContext _context) : IInventoryInspectionRepository
    {
        public async Task<List<MES_INV_LOT_INSP_DA>> GetInspNumberList(Expression<Func<MES_INV_LOT_INSP_DA, bool>> expression)
        {
            return await _context.MES_INV_LOT_INSP_DA
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();
        }


        public async Task<ResponseProcedure> GetInspNumberList()
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_INSP_NO_LIST")
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> MoveLot(string lotNumber, string storageCode, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_LOT_MOVE")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> SetInspection(string storageCode, string inspection, string[] lotList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_LT")
               .Procedure("SET_LOT_INSP_NEW")
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_INSP_NO", OracleDbType.Varchar2, inspection)
               .Input("P_LOT_NO", "ARR_VALUE", lotList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_VAL", OracleDbType.Varchar2)
               .Exec();
        }
    }
}