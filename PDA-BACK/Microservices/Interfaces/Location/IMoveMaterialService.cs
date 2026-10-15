using HWMX.DotNet;
using Repositories.Database;
using Repositories.Database.Location;

namespace Microservices.Interfaces.Location
{
    public interface IMoveMaterialService
    {
        Task<ResponseList<MATERIAL_ISSUE_DTO>> GetIssueReq(string issueNumber);
        Task<ResponseList<LOT_INFORMATION_DTO>> GetMaterialFIFO(string lotNumber); 
        Task<ResponseDTO<string>> MoveMaterialList(string issueNumber, string[] lotNumberList);
    }
}