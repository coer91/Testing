using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IMoveMaterialRepository
    {
        Task<ResponseProcedure> GetIssueReq(string issueNumber);
        Task<ResponseProcedure> GetMaterialFIFO(string lotNumber); 
        Task<ResponseProcedure> MoveMaterialList(string issueNumber, string[] lotNumberList, string user);
    }
}