using HWMX.DotNet.ORM;
using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Interfaces.Lot
{
    public interface IInventoryInspectionRepository
    {
        Task<List<MES_INV_LOT_INSP_DA>> GetInspNumberList(Expression<Func<MES_INV_LOT_INSP_DA, bool>> expression);
        Task<ResponseProcedure> GetInspNumberList();
        Task<ResponseProcedure> MoveLot(string lotNumber, string storageCode, string user);
        Task<ResponseProcedure> SetInspection(string storageCode, string inspection, string[] lotList, string user);
    }
} 