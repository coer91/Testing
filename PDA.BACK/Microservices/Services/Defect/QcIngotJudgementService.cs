using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class QcIngotJudgementService(IQcIngotJudgementRepository _repository, IHttpContextAccessor _httpContext) : IQcIngotJudgementService
    {
        public async Task<ResponseDTO<dynamic>> GetMaterialInfo_QC(string Serial)
        {
            ResponseDTO<dynamic> response = new();
            try
            {
                ResponseProcedure responseProcedure = await _repository.GetMaterialInfo_QC(Serial);

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

        public async Task<ResponseDTO<dynamic>> SetIngotQcJudge(string Serial, string MatId, string LastOp, int JudgeWeight)
        {
            ResponseDTO<dynamic> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetIngotQcJudge(Serial, MatId, LastOp, JudgeWeight, httpContext.UserId.ToString());

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
    }
} 