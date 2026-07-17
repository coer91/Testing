using HWMX.DotNet;

namespace Microservices.Interfaces.Lot
{
    public interface ISplitService
    {
        Task<ResponseDTO<string>> SplitLot(string lotNumber, int qty, string paperType, string printer);
    }
} 