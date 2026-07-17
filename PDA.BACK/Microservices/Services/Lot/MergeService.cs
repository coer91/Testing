using Microservices.Interfaces.Lot;
using Repositories.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;
using Microservices.DTOs;

namespace Microservices.Services.Lot
{
    public class MergeService(IMergeRepository _repository, IHttpContextAccessor _httpContext) : IMergeService
    {
        public async Task<ResponseDTO<string>> MergeLot(string paperType, string printer, LotInformationDTO[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {

                if (string.IsNullOrWhiteSpace(paperType))
                    return response.BadRequest("Paper type is required");

                if (string.IsNullOrWhiteSpace(printer))
                    return response.BadRequest("Printer is required");

                string lotNumbers = string.Join(";", lotNumberList.Select(x => x.LotNumber));   

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();

                if (string.IsNullOrWhiteSpace(httpContext.User))
                    return response.BadRequest("User is required");

                ResponseProcedure responseProcedure = await _repository.MergeLot(paperType, printer, lotNumbers, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (!response.Data.StartsWith("MES"))
                    return response.BadRequest(response.Data); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 