using Microservices.Interfaces.Defect;
using Repositories.Interfaces.Defect;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Defect
{
    public class ScrapAreaLotSplitService(IScrapAreaLotSplitRepository _repository, IHttpContextAccessor _httpContext) : IScrapAreaLotSplitService
    {
        public async Task<ResponseDTO<dynamic>> GetScrapAreaLotInfo(string LotNo)
        {
            ResponseDTO<dynamic> response = new();
            try
            {
                ResponseProcedure responseProcedure = await _repository.GetScrapAreaLotInfo(LotNo);

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