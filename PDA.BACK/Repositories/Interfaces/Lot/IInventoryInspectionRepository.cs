using HWMX.DotNet.ORM; 

namespace Repositories.Interfaces.Lot
{
    public interface IInventoryInspectionRepository
    { 
        Task<ResponseProcedure> GetInspectionNumberList(string storageCode, int range = 15);
        Task<ResponseProcedure> CreateInspectionNumber(string storageCode, string user);
        Task<ResponseProcedure> MoveLot(string lotNumber, string storageCode, string user);
        Task<ResponseProcedure> SetInspectionLot(string storageCode, string inspection, string[] lotList, string user);
    }
} 