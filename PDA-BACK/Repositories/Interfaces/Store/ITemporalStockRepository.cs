using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface ITemporalStockRepository
    {
        Task<ResponseProcedure> GetTemporalStock(string operation);
        Task<ResponseProcedure> SetTemporalStock(
            string operation,
            string barcode,
            string lotNumber,
            string partNumber,
            string eoNumber,
            int qty,
            string unit,
            string storageCode,
            string vendorCode,
            string productionDate,
            string erpCode,
            string deliverySlip,
            string deliveryItem,
            string category,
            string model,
            string corp,
            string ship,
            string container, 
            string user 
        );
        Task<ResponseProcedure> DeleteTemporalStock(string operation, string barcode, string user);
        Task<ResponseProcedure> ClearTemporalStock(string operation, string user);
    }
} 