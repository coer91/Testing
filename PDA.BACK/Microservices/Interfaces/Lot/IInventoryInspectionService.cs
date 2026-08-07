using HWMX.DotNet;
using Repositories.Database.Lot;

namespace Microservices.Interfaces.Lot
{
    public interface IInventoryInspectionService
    {
        Task<ResponseList<INSPECTION_DTO>> GetInspectionNumberList(string storageCode, int range = 15);
        Task<ResponseDTO<string>> CreateInspectionNumber(string storageCode);
        Task<ResponseDTO<string>> MoveLot(string lotNumber, string storageCode);
        Task<ResponseDTO<string>> SetInspectionLot(string storageCode, string inspection, string[] lotList);
    }
} 