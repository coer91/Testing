using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class ReworkJudgementService(IReworkJudgementRepository _repository, IHttpContextAccessor _httpContext) : IReworkJudgementService
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

        public async Task<ResponseDTO<string>> SetQmRework(string ErrNo, string SerialNo)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetQmRework(ErrNo, SerialNo, httpContext.UserId.ToString());

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