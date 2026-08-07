using HWMX.DotNet; 
using Repositories.Database;

namespace Microservices.Interfaces
{
    public interface IMasterService
    {
        Task<ResponseDTO<LOT_INFORMATION_DTO>> GetLotInformation(string lotNumber);
        Task<ResponseList<LOT_INFORMATION_DTO>> GetLotListByCaseLabel(string caseLabel, string storageCode = "");
        Task<ResponseList<LOT_INFORMATION_DTO>> GetLotListByLocation(string location);
        Task<ResponseList<STORAGE_DTO>> GetStorageList(string factory = "", string storageType = "");
        Task<ResponseDTO<RACK_LOCATION_DTO>> GetLocation(string location);
        Task<ResponseList<RACK_LOCATION_DTO>> GetLocationList(string rack, string rackType); 
        Task<ResponseList<RACK_LOCATION_DTO>> GetLocationByMaterial(string partNumber);
        Task<ResponseList<PRINTER_DTO>> GetPrinterList();
    }
} 