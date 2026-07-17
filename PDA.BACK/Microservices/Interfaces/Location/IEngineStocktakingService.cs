using HWMX.DotNet;

namespace Microservices.Interfaces.Location
{
    public interface IEngineStocktakingService
    {
        Task<ResponseList<dynamic>> GetPallet3C(string palletCode);
        Task<ResponseDTO<string>> SetStocktaking(string[] lotNumberList);
    }
} 