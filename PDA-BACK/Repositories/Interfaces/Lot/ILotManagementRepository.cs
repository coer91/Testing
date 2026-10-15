using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Lot
{
    public interface ILotManagementRepository
    {
        Task<ResponseProcedure> Join(string paperType, string printer, string lotNumberList, string user);
        Task<ResponseProcedure> Split(string lotNumber, int qty, string paperType, string printer, string user);
    }
} 