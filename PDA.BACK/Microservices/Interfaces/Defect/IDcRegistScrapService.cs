using HWMX.DotNet; 

namespace Microservices.Interfaces.Defect
{
    public interface IDcRegistScrapService
    {
        Task<ResponseList<dynamic>> GetDieScrapSerial(string serial);
        Task<ResponseDTO<string>> SetDCStocktaking(List<string> serialList);
    }
}