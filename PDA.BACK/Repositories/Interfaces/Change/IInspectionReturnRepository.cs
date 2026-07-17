using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Change
{
    public interface IInspectionReturnRepository
    {
        Task<ResponseProcedure> SetRetTransferVD(string LotNo, string UserId);
    }
} 