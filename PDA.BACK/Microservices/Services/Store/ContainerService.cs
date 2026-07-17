using Microservices.Interfaces.Store;
using Repositories.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Store
{
    public class ContainerService(IContainerRepository _repository, IHttpContextAccessor _httpContext) : IContainerService
    { 

        public async Task<ResponseList<dynamic>> GetContainerDownload(string orderNumber)
        {
            ResponseList<dynamic> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                string language = string.IsNullOrWhiteSpace(httpContext.Language) ? LANGUAGE.ENGLISH.Id : httpContext.Language;

                ResponseProcedure responseProcedure = await _repository.GetContainerDownload(orderNumber, language);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new {
                        x.CASE_LABEL_ID,
                        x.TYPE         
                    })
                ];
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
                string user = _httpContext.ToHttpRequest().User;
                ResponseProcedure responseProcedure = await _repository.SetContainerDownload(orderNumber, caseLabelList, user);

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


        public async Task<ResponseList<dynamic>> GetContainerLoad(string orderNumber)
        {
            ResponseList<dynamic> response = new();

            try
            {
                if (orderNumber.Length != 10)
                    return response.BadRequest("The code does not correspond to an order number");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                string language = string.IsNullOrWhiteSpace(httpContext.Language) ? LANGUAGE.ENGLISH.Id : httpContext.Language;

                ResponseProcedure responseProcedure = await _repository.GetContainerLoad(orderNumber, language);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);
                 
                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new {
                        x.CASE_LABEL_ID,
                        x.TYPE,
                    })
                ];
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


        public async Task<ResponseDTO<string>> CheckOrder(string orderNumber, string caseLabel)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(orderNumber))
                    return response.BadRequest("Order number is required");

                if (string.IsNullOrWhiteSpace(caseLabel))
                    return response.BadRequest("Case label is required");

                ResponseProcedure responseProcedure = await _repository.CheckOrder(orderNumber, caseLabel);

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