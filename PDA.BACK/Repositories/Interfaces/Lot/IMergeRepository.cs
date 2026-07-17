using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Lot
{
    public interface IMergeRepository
    {
        Task<ResponseProcedure> MergeLot(string paperType, string printer, string lotNumberList, string user);
    }
} 