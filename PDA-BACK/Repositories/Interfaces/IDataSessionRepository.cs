using HWMX.DotNet.ORM; 

namespace Repositories.Interfaces
{
    public interface IDataSessionRepository
    {
        Task<ResponseProcedure> GetDataSession(string pageCode, string operation, string user);
        Task<ResponseProcedure> GetLastDataSession(string pageCode, string user);
        Task<ResponseProcedure> GetDetailDataSession(string pageCode, string detail);
        Task<ResponseProcedure> AddDataSession(string pageCode, string operation, string detail, string json, string user);
        Task<ResponseProcedure> SetDataSession(string pageCode, string operation, string[] detailArray, string[] jsonArray, string user);
        Task<ResponseProcedure> DeleteDataSession(string pageCode, string operation, string detail, string user);
        Task<ResponseProcedure> ClearDataSession(string pageCode, string operation, string user);
    }
} 