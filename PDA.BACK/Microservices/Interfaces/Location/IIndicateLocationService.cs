using Repositories.Database;
using HWMX.DotNet;

namespace Microservices.Interfaces.Location
{
    public interface IIndicateLocationService
    {
        Task<ResponseList<LOT_INFORMATION_DTO>> GetLotListByCaseLabel(string caseLabel); 
        Task<ResponseList<string>> GetMaterialByLocation(string location);
        Task<ResponseDTO<string>> SetLotsInLocation(string storageCode, string location, string[] lotNumberList);
        Task<ResponseDTO<string>> SetInventoryCell(string location, string[] lotLocationList);
    }
} 