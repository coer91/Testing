using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class ReworkApprovalService(IReworkApprovalRepository _repository, IHttpContextAccessor _httpContext) : IReworkApprovalService
    {
        public async Task<ResponseDTO<dynamic>> GetReworkInfo(string SerialNo, string Type)
        {
            ResponseDTO<dynamic> response = new();
            try
            {
                ResponseProcedure responseProcedure = await _repository.GetReworkInfo(SerialNo, Type);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_CURSOR");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }

        public async Task<ResponseDTO<string>> SetQmReworkApprov(string ErrNo, string NGNotes)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetQmReworkApprov(ErrNo, NGNotes, httpContext.UserId.ToString());

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
}