using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Store
{
    public interface IContainerRepository
    {
        Task<ResponseProcedure> GetContainerDownload(string orderNumber, string language);
        Task<ResponseProcedure> SetContainerDownload(string orderNumber, string[] caseLabelList, string user);
        Task<ResponseProcedure> GetContainerLoad(string orderNumber, string language);
        Task<ResponseProcedure> SetContainerLoad(string orderNumber, string[] caseLabelList, string user); 
        Task<ResponseProcedure> CheckOrder(string orderNumber, string caseLabel);
    }
} 