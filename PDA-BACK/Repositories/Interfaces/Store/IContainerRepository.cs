using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface IContainerRepository
    {
        Task<ResponseProcedure> GetContainerDownload(string orderNumber);
        Task<ResponseProcedure> SetContainerDownload(string orderNumber, string[] caseLabelList, string user);
        Task<ResponseProcedure> GetContainerLoad(string orderNumber);
        Task<ResponseProcedure> SetContainerLoad(string orderNumber, string[] caseLabelList, string user); 
        Task<ResponseProcedure> CheckContainerOrder(string orderNumber, string caseLabel);
    }
} 