using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Http;
using Repositories.Database; 
using Repositories.Interfaces.Delivery;

namespace Microservices.Services.Delivery
{
    public class SendingEngineService(ISendingEngineRepository _repository, IHttpContextAccessor _httpContext) : ISendingEngineService
    { 

        public async Task<ResponseList<GLOVIS_ORDER_DTO>> GetOrderList()
        {
            ResponseList<GLOVIS_ORDER_DTO> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                string stationCode = httpContext.Factory.Equals("A") ? "A0TRK01-GV" : "A0TRK01-00";
                ResponseProcedure responseProcedure = await _repository.GetOrderList(stationCode, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetTable<GLOVIS_ORDER_DTO>();                
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ENGINE_DTO>> GetEngineByOrder(string orderNumber, string engineCode)
        {
            ResponseDTO<ENGINE_DTO> response = new();

            try
            {
                if(string.IsNullOrWhiteSpace(orderNumber))
                    return response.BadRequest("Order number not provided");

                if (engineCode.Length != 16) 
                    return response.BadRequest("Invalid code"); 


                string engineType = engineCode[..6];
                string engineNumber = engineCode.Substring(6, 6);
                string mipCode = engineCode.Substring(12, 4);
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                string stationCode = httpContext.Factory.Equals("A") ? "A0TRK01-GV" : "A0TRK01-00";

                ResponseProcedure responseProcedure = await _repository.GetEngineByOrder(orderNumber, stationCode, $"{mipCode}{engineType}", engineNumber, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                string message = responseProcedure.GetOutput("IO_MESSAGE");

                if (!message.Equals("OK"))
                    return response.Conflict(message);

                //Response 
                response.Data = responseProcedure.GetTable<ENGINE_DTO>().FirstOrDefault();

                if (response.Data is null)
                    return response.NotFound(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetGlovisOrder(string orderNumber)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetGlovisOrder(orderNumber, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (response.Data != "OK")
                    return response.Conflict(response.Data);

                response.Data = LANGUAGE.MESSAGE.SuccessfulTransaction(httpContext.Language);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 