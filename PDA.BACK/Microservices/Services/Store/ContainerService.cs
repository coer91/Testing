using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using Repositories.Database.Store;
using Repositories.Interfaces.Store;

namespace Microservices.Services.Store
{
    public class ContainerService(IContainerRepository _repository, IHttpContextAccessor _httpContext) : IContainerService
    { 

        public async Task<ResponseList<CONTAINER_DTO>> GetContainerDownload(string orderNumber)
        {
            ResponseList<CONTAINER_DTO> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                string language = string.IsNullOrWhiteSpace(httpContext.Language) ? LANGUAGE.ENGLISH.Id : httpContext.Language;

                ResponseProcedure responseProcedure = await _repository.GetContainerDownload(orderNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<CONTAINER_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetContainerDownload(string orderNumber, string[] caseLabelList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetContainerDownload(orderNumber, caseLabelList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE"); 

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

                response.Data = LANGUAGE.MESSAGE.SuccessfulTransaction(httpContext.Language);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<CONTAINER_DTO>> GetContainerLoad(string orderNumber)
        {
            ResponseList<CONTAINER_DTO> response = new();

            try
            {
                if (orderNumber.Length != 10)
                    return response.BadRequest("The code does not correspond to an order number");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                string language = string.IsNullOrWhiteSpace(httpContext.Language) ? LANGUAGE.ENGLISH.Id : httpContext.Language;

                ResponseProcedure responseProcedure = await _repository.GetContainerLoad(orderNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<CONTAINER_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetContainerLoad(string orderNumber, string[] caseLabelList)
        {
            ResponseDTO<string> response = new();

            try
            {
                string user = _httpContext.ToHttpRequest().User;
                ResponseProcedure responseProcedure = await _repository.SetContainerLoad(orderNumber, caseLabelList, user);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (string.IsNullOrWhiteSpace(response.Data))
                    response.Data = "OK";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> CheckContainerOrder(string orderNumber, string caseLabel)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(orderNumber))
                    return response.BadRequest("Order number is required");

                if (string.IsNullOrWhiteSpace(caseLabel))
                    return response.BadRequest("Case label is required");

                ResponseProcedure responseProcedure = await _repository.CheckContainerOrder(orderNumber, caseLabel);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (!response.Data.Equals("OK"))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 