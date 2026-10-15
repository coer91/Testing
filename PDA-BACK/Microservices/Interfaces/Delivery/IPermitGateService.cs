using HWMX.DotNet;
using Repositories.Database.Delivery;

namespace Microservices.Interfaces.Delivery
{
    public interface IPermitGateService  
    {
        Task<ResponseDTO<GATE_PERMIT_DTO>> GetGatePermit(string shippingNumber);
        Task<ResponseDTO<string>> SetGatePermit(string gatePos, string shippingNumber);
        Task<ResponseList<GATE_PERMIT_DETAIL_DTO>> GetGatePermitDetail(string shippingNumber);
    }
}