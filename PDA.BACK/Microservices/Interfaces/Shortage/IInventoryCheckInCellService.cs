using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces.Shortage
{
    public interface IInventoryCheckInCellService
    { 
        Task<ResponseList<DataSourceDTO>> GetCaseLotInfo(string caseLabelId);
        Task<ResponseDTO<string>> SetInventoryCellMulti(string location, string[] lotLocationList);
    }
} 