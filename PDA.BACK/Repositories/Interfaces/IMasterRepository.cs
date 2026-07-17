using HWMX.DotNet.ORM;

namespace Repositories.Interfaces
{
    public interface IMasterRepository
    {
        Task<ResponseProcedure> GetLotInformation(string lotNumber);
        Task<ResponseProcedure> GetLotListByCaseLabel(string caseLabel, string storageCode = "");
        Task<ResponseProcedure> GetLotListByLocation(string location);
        Task<ResponseProcedure> GetStorageList(string factory = "", string storageType = "");
        Task<ResponseProcedure> GetLocation(string location = "", string rack = "", string rackType = "");
        Task<ResponseProcedure> GetLocationByMaterial(string partNumber);
        Task<ResponseProcedure> GetPrinterList(string printer = null);
    }
} 