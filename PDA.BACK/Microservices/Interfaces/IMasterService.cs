using HWMX.DotNet;
using Microservices.DTOs; 

namespace Microservices.Interfaces
{
    public interface IMasterService
    {
        Task<ResponseDTO<LotInformationDTO>> GetLotInformation(string lotNumber);
        Task<ResponseList<LotInformationDTO>> GetLotListByCaseLabel(string caseLabel, string storageCode = "");
        Task<ResponseList<LotInformationDTO>> GetLotListByLocation(string location);
        Task<ResponseList<StorageDTO>> GetStorageList(string factory = "", string storageType = "");
        Task<ResponseDTO<RackLocationDTO>> GetLocation(string location);
        Task<ResponseList<RackLocationDTO>> GetLocationList(string rack, string rackType); 
        Task<ResponseList<RackLocationDTO>> GetLocationByMaterial(string partNumber);
        Task<ResponseList<OptionDTO>> GetPrinterList();
    }
} 