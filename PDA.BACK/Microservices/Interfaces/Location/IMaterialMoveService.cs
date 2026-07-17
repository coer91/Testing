using HWMX.DotNet;

namespace Microservices.Interfaces.Location
{
    public interface IMaterialMoveService
    {
        Task<ResponseList<dynamic>> GetMaterialByIssue(string issueNumber);
        Task<ResponseList<dynamic>> GetMaterialFIFO(string lotNumber);
        Task<ResponseList<dynamic>> GetLotFIFO(string partNumber, string lotNumber);
        Task<ResponseDTO<string>> MoveMaterial(string issueNumber, string[] lotNumberList);
    }
} 