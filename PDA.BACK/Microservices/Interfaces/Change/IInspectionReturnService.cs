using HWMX.DotNet; 

namespace Microservices.Interfaces.Change
{
    public interface IInspectionReturnService
    {        
        Task<ResponseDTO<string>> SetRetTransferVD(string LotNo);
    }
} 