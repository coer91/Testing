using HWMX.DotNet;

namespace Microservices.Interfaces.Change
{
    public interface IVendorReturnService
    {
        Task<ResponseList<dynamic>> GetReturnPO(string Vendor);
        Task<ResponseDTO<string>> SetRetVendor(string RetPO, List<string> list_LOT_No);
        Task<ResponseList<dynamic>> GetReturnRequest(string RetPO);
    }
} 