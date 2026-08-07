using Microservices.Interfaces.Lot;
using Repositories.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Lot
{
    public class LotJoinService(ILotManagementRepository _repository, IHttpContextAccessor _httpContext) : ILotManagementService
    {
        public async Task<ResponseDTO<string>> Join(string paperType, string printer, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(paperType))
                    return response.BadRequest("Paper type is required");

                if (string.IsNullOrWhiteSpace(printer))
                    return response.BadRequest("Printer is required");

                string lotNumbers = string.Join(";", lotNumberList);   

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();

                if (string.IsNullOrWhiteSpace(httpContext.User))
                    return response.BadRequest("User is required");

                ResponseProcedure responseProcedure = await _repository.Join(paperType, printer, lotNumbers, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.StartsWith("MES"))
                    return response.Conflict(response.Data); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> Split(string lotNumber, int qty, string paperType, string printer)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(lotNumber))
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

                ResponseProcedure responseProcedure = await _repository.Split(lotNumber, qty, paperType, printer, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

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