using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IIndicateLocationRepository
    {
        Task<ResponseProcedure> GetLotListByCaseLabel(string caseLabel); 
        Task<ResponseProcedure> GetMaterialByLocation(string location);
        Task<ResponseProcedure> SetLotsInLocation(string storageCode, string location, string[] lotNumberList, string sUserId);
        Task<ResponseProcedure> SetInventoryCell(string user, string location, string[] lotLocationList);
    }
} 