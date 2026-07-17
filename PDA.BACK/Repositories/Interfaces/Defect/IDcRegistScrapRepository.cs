using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Defect
{
    public interface IDcRegistScrapRepository
    {
        Task<ResponseProcedure> GetDieScrapSerial(string serial);

        Task<ResponseProcedure> SetDCStocktaking(List<string> serialList, string user);
    }
} 