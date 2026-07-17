using HWMX.DotNet;

namespace Microservices.Interfaces.Defect
{
    public interface IScrapAreaLotSplitService
    {
        Task<ResponseDTO<dynamic>> GetScrapAreaLotInfo(string LotNo);
    }
} 