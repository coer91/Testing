using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class MaterialDefectService(IMaterialDefectRepository _repository, IHttpContextAccessor _httpContext) : IMaterialDefectService
    {
        public async Task<ResponseList<dynamic>> GetLotInfo(string LotNo)
        {
                        ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotInfo(LotNo);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<dynamic>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }

        public async Task<ResponseDTO<string>> SetMatDefectRequest(string LotNo, string StorageCd, string DEF_M_CD, string DEF_D_CD)
        {
                        ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetMatDefectRequest(LotNo, StorageCd, DEF_M_CD, DEF_D_CD, httpContext.UserId.ToString());

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