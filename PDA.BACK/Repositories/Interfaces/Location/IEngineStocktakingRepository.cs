using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IEngineStocktakingRepository
    {
        Task<ResponseProcedure> GetPallet3C(string palletCode);
        Task<ResponseProcedure> SetStocktaking(string[] lotNumberList, string user);
    }
} 