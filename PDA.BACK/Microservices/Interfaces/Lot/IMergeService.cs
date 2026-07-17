using HWMX.DotNet;
using Microservices.DTOs; 

namespace Microservices.Interfaces.Lot
{
    public interface IMergeService
    { 
        Task<ResponseDTO<string>> MergeLot(string paperType, string printer, LotInformationDTO[] lotNumberList);
    }
} 