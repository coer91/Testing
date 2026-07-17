using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IMaterialMoveRepository
    {
        Task<ResponseProcedure> GetMaterialByIssue(string issueNumber);
        Task<ResponseProcedure> GetMaterialFIFO(string lotNumber);
        Task<ResponseProcedure> GetLotFIFO(string partNumber);
        Task<ResponseProcedure> MoveMaterial(string issueNumber, string[] lotNumberList, string user);
    }
} 