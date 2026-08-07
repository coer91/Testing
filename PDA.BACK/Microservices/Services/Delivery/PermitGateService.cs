using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Http;
using Repositories.Database.Delivery;
using Repositories.Interfaces.Delivery;
using System.Globalization;

namespace Microservices.Services.Delivery
{
    public class PermitGateService(IPermitGateRepository _repository, IHttpContextAccessor _httpContext) : IPermitGateService
    {

        public async Task<ResponseDTO<GATE_PERMIT_DTO>> GetGatePermit(string shippingNumber)
        {
            ResponseDTO<GATE_PERMIT_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetGatePermit(shippingNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetTable<GATE_PERMIT_DTO>().FirstOrDefault();

                if (response.Data is null)
                    return response.NotFound();

                if (!string.IsNullOrWhiteSpace(response.Data.SHIPPING_DT)) 
                    response.Data.SHIPPING_DT = DateTime.ParseExact(response.Data.SHIPPING_DT, "dd/MM/yyyy hh:mm:ss tt", new CultureInfo("es-MX")).ToString("dd MMM yyyy"); 
                                
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetGatePermit(string gatePos, string shippingNumber)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetGatePermit(gatePos, shippingNumber, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest($"This shipping already<br>recived at {response.Data}");

                response.Data = LANGUAGE.MESSAGE.SuccessfulTransaction(httpContext.Language);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }

        public async Task<ResponseList<GATE_PERMIT_DETAIL_DTO>> GetGatePermitDetail(string shippingNumber)
        {
            ResponseList<GATE_PERMIT_DETAIL_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetGatePermitDetail(shippingNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetTable<GATE_PERMIT_DETAIL_DTO>();

                if (response.Data is null || !response.Data.Any())
                    return response.NotFound();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
}