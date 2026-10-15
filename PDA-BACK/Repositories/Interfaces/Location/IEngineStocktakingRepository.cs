using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IEngineStocktakingRepository
    {
        Task<ResponseProcedure> Get3CPalletInfo(string PalletCode);
        Task<ResponseProcedure> SetFinalStocktaking(string[] SerialNoList, string User);
    }
}