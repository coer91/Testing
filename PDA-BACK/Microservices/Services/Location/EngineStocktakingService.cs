using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Interfaces.Location;

namespace Microservices.Services.Location
{
    public class EngineStocktakingService(IEngineStocktakingRepository _repository, IHttpContextAccessor _httpContext) : IEngineStocktakingService
    {
        public async Task<ResponseList<STOCKTAKING_PALLET_DTO>> Get3CPalletInfo(string PalletCode)
        {
            ResponseList<STOCKTAKING_PALLET_DTO> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(PalletCode))
                    return response.BadRequest("Pallet code is required");

                ResponseProcedure responseProcedure = await _repository.Get3CPalletInfo(PalletCode);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<STOCKTAKING_PALLET_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }

        public async Task<ResponseDTO<string>> SetFinalStocktaking(string[] SerialNoList)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (SerialNoList == null || SerialNoList.Length == 0)
                    return response.BadRequest("Serial numbers are required");

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();

                ResponseProcedure responseProcedure = await _repository.SetFinalStocktaking(SerialNoList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.Conflict(response.Data);

                response.Data = LANGUAGE.MESSAGE.SuccessfulTransaction(httpContext.Language);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
}