using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Interfaces;

namespace Microservices.Services
{
    public class DataSessionService(IDataSessionRepository _repository, IHttpContextAccessor _httpContext) : IDataSessionService
    {
        
        public async Task<ResponseList<DATA_SESSION_DTO>> GetDataSession(string pageCode, string operation)
        {
            ResponseList<DATA_SESSION_DTO> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(operation))
                    return response.BadRequest("Operation no provided"); 

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GetDataSession(pageCode, operation, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<DATA_SESSION_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<DATA_SESSION_DTO>> GetLastDataSession(string pageCode)
        {
            ResponseList<DATA_SESSION_DTO> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided"); 

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GetLastDataSession(pageCode, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<DATA_SESSION_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<DATA_SESSION_DTO>> GetDetailDataSession(string pageCode, string detail)
        {
            ResponseDTO<DATA_SESSION_DTO> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(detail))
                    return response.BadRequest("Detail no provided");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GetDetailDataSession(pageCode, detail);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<DATA_SESSION_DTO>().FirstOrDefault();

                if (response.Data is null)
                    return response.NotFound(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response; 
        }


        public async Task<ResponseDTO<string>> GetStatusDataSession(string pageCode, string detail)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(detail))
                    return response.BadRequest("Detail no provided");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GetDetailDataSession(pageCode, detail);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList); 

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.Equals("OK"))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> AddDataSession(string pageCode, string operation, string detail, string json)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(operation))
                    return response.BadRequest("Operation no provided");

                if (string.IsNullOrWhiteSpace(detail))
                    return response.BadRequest("Detail no provided");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.AddDataSession(pageCode, operation, detail, json, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.Equals("OK"))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetDataSession(string pageCode, string operation, string[][] detail)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(operation))
                    return response.BadRequest("Operation no provided"); 

                string[] detailArray = detail.Length > 0 ? detail[0] : [];
                string[] jsonArray   = detail.Length > 1 ? detail[1] : [];

                if (!detailArray.Any() || detailArray.Any(x => string.IsNullOrWhiteSpace(x)))
                    return response.BadRequest("Detail not provided");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetDataSession(pageCode, operation, detailArray, jsonArray, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.Equals("OK"))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> DeleteDataSession(string pageCode, string operation, string detail)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(operation))
                    return response.BadRequest("Operation no provided");

                if (string.IsNullOrWhiteSpace(detail))
                    return response.BadRequest("Detail no provided");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.DeleteDataSession(pageCode, operation, detail, httpContext.User);
                
                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.Equals("OK"))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> ClearDataSession(string pageCode, string operation)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(pageCode))
                    return response.BadRequest("Page Code no provided");

                if (string.IsNullOrWhiteSpace(operation))
                    return response.BadRequest("Operation no provided"); 

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.ClearDataSession(pageCode, operation, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

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
