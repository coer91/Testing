using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Change
{
    public interface IVendorReturnRepository
    {
        Task<ResponseProcedure> GetReturnPO(string Vendor);

        Task<ResponseProcedure> SetRetVendor(string RetPO, List<string> list_LOT_No, string userId);

        Task<ResponseProcedure> GetReturnRequest(string RetPO);
    }
} 