using HWMX.DotNet.ORM;

namespace Repositories.Interfaces.Location
{
    public interface IMaterialMoveNewRepository
    {
        Task<ResponseProcedure> GetMaterialByIssue(string issueNumber);
        Task<ResponseProcedure> GetMaterialFIFO(string lotNumber);
        /// <summary>
        /// Gets the real FIFO information for a given lot number.
        /// </summary>Task<ResponseProcedure> GetRealFIFOInfo(string lotNumber);
        Task<ResponseProcedure> GetLotFIFO(string partNumber);
        Task<ResponseProcedure> MoveMaterial(string issueNumber, string[] lotNumberList, string user);
    }
} 