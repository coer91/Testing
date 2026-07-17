using HWMX.DotNet.ORM;  

namespace Repositories.Interfaces.Shortage
{
    public interface IInventoryCheckInCellRepository
    {  
        Task<ResponseProcedure> GetCaseLotInfo(string caseLabelId);
        Task<ResponseProcedure> SetInventoryCellMulti(string user, string location, string[] lotLocationList);

    }
} 