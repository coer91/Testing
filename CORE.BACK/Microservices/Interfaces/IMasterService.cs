using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces
{
    public interface IMasterService
    { 
        Task<ResponseList<RackLocationDTO>> GetRackLocationList();
        Task<ResponseDTO<RackLocationDTO>>GetRackLocInfo(string locNo, string rackType1 = "");
        Task<ResponseList<RackLocationPartNoDTO>> GetRackLocationPartNoList(string partNo);
        Task<ResponseList<StorageDTO>> GetStorageList();
    }
} 