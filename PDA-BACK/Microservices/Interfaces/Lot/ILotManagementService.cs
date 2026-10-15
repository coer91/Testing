using HWMX.DotNet; 

namespace Microservices.Interfaces.Lot
{
    public interface ILotManagementService
    { 
        Task<ResponseDTO<string>> Join(string paperType, string printer, string[] lotNumberList);
        Task<ResponseDTO<string>> Split(string lotNumber, int qty, string paperType, string printer);
    }
} 