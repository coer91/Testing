using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class OperDefectRegService(IOperDefectRegRepository _repository, IHttpContextAccessor _httpContext) : IOperDefectRegService
    {
        public async Task<ResponseDTO<dynamic>> GetSerialNoInfo(string LineCode, string MatId, string SerialNo)
        {
            ResponseDTO<dynamic> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GetSerialNoInfo(httpContext.Factory, LineCode, MatId, SerialNo);

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

        public async Task<ResponseDTO<string>> SetDefectRequest(string SerialNo, string OPCode, string MatID, string DEF_M_CD, string DEF_D_CD)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetDefectRequest(SerialNo, OPCode, MatID, DEF_M_CD, DEF_D_CD, httpContext.UserId.ToString());

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