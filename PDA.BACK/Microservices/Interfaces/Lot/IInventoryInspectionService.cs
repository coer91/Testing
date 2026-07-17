using HWMX.DotNet;
using Microservices.DTOs; 

namespace Microservices.Interfaces.Lot
{
    public interface IInventoryInspectionService
    {
        Task<ResponseList<InspectionNumberDTO>> GetInspNumberList(string storageCode = "", int range = 15);
        Task<ResponseDTO<string>> MoveLot(string lotNumber, string storageCode);
        Task<ResponseDTO<string>> SetInspection(string storageCode, string inspection, string[] lotList);
    }
} 