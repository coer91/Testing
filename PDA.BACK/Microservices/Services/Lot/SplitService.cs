using Microservices.Interfaces.Lot;
using Repositories.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Lot
{
    public class SplitService(ISplitRepository _repository, IHttpContextAccessor _httpContext) : ISplitService
    {
        public async Task<ResponseDTO<string>> SplitLot(string lotNumber, int qty, string paperType, string printer)
        {
            ResponseDTO<string> response = new();

            try
            {
                if(string.IsNullOrWhiteSpace(lotNumber))
                    return response.BadRequest("Lot number is required");

                if (qty <= 0)
                    return response.BadRequest("Quantity is required");

                if (string.IsNullOrWhiteSpace(paperType))
                    return response.BadRequest("Paper type is required");

                if (string.IsNullOrWhiteSpace(printer))
                    return response.BadRequest("Printer is required");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();

                if (string.IsNullOrWhiteSpace(httpContext.User))
                    return response.BadRequest("User is required");

                ResponseProcedure responseProcedure = await _repository.SplitLot(lotNumber, qty, paperType, printer, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList); 

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

                response.Data = responseProcedure.GetOutput("P_NEW_LOT_NO");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
}