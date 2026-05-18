using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Interfaces
{
    public interface IMasterService
    { 
        Task<ResponseList<RackLocationDTO>> GetRackLocationList();
    }
} 