using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using Repositories.Interfaces.Location;

namespace Microservices.Services.Location
{
    public class EngineStocktakingService(IEngineStocktakingRepository _repository, IHttpContextAccessor _httpContext) : IEngineStocktakingService
    { 

        public async Task<ResponseList<dynamic>> GetPallet3C(string palletCode)
        {
            ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetPallet3C(palletCode);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                     responseProcedure.GetTable<dynamic>().Select(x => new
                     {
                         Serial = x?.SERIAL_NO,
                         Pallet = x?.PALLET_CODE
                     }).Where(x => !string.IsNullOrWhiteSpace($"{x?.Serial}"))
               ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetStocktaking(string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetStocktaking(lotNumberList, httpContext.User);

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