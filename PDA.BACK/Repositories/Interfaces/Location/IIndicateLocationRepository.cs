using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IIndicateLocationRepository
    {
        Task<ResponseProcedure> GetCaseLabelLocation(string caseLabel);
        //Task<ResponseProcedure> PartNumberLocationMatching(string location, string partNumber);
        Task<ResponseProcedure> GetMaterialByLocation(string location);
        Task<ResponseProcedure> SetLotsInLocation(string storageCode, string location, string[] lotNumberList, string sUserId);

    }
} 