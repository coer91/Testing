using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class MaterialOutputService(IMaterialOutputRepository _repository, IHttpContextAccessor _httpContext) : IMaterialOutputService
    {
        public async Task<ResponseDTO<string>> SetScrapAreaOutput(string ErrNo, string LotNo)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetScrapAreaOutput(ErrNo, LotNo, httpContext.UserId.ToString());

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

        public async Task<ResponseDTO<string>> GetNGStatusInfoOut(string LotNo, string LotType)
        {
            ResponseDTO<string> response = new();
            try
            {
                ResponseProcedure responseProcedure = await _repository.GetNGStatusInfoOut(LotNo, LotType);

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