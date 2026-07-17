using Microservices.Interfaces.Change;
using Repositories.Interfaces.Change; 
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Change
{
    public class InspectionReturnService(IInspectionReturnRepository _repository, IHttpContextAccessor _httpContext) : IInspectionReturnService
    {        
        public async Task<ResponseDTO<string>> SetRetTransferVD(string LotNo)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetRetTransferVD(LotNo, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
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