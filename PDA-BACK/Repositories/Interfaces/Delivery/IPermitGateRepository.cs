using HWMX.DotNet.ORM; 

namespace Repositories.Interfaces.Delivery
{
    public interface IPermitGateRepository
    {
        Task<ResponseProcedure> GetGatePermit(string shippingNumber);
        Task<ResponseProcedure> SetGatePermit(string gatePos, string shippingNumber, string user);

        Task<ResponseProcedure> GetGatePermitDetail(string shippingNumber);
    }
}