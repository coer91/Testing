using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Lot
{
    public interface ISplitRepository
    {
        Task<ResponseProcedure> SplitLot(string lotNumber, int qty, string paperType, string printer, string user);
    }
} 