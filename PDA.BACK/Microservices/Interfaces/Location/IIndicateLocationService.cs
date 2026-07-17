using HWMX.DotNet;
using Microservices.DTOs;
namespace Microservices.Interfaces.Location
{
    public interface IIndicateLocationService
    {
        Task<ResponseList<DataSourceDTO>> GetCaseLabelLocation(string caseLabel);
        //Task<ResponseDTO<string>> PartNumberLocationMatching(string location, string partNumber);
        Task<ResponseList<string>> GetMaterialByLocation(string location);
        Task<ResponseDTO<string>> SetLotsInLocation(string storageCode, string location, string[] lotNumberList);
    }
} 