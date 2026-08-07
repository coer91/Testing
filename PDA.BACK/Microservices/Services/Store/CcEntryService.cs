using Microservices.Interfaces.Store;
using Repositories.Interfaces.Store;
using Repositories.Database.Store;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM; 
using HWMX.DotNet;

namespace Microservices.Services.Store
{
    public class CcEntryService(ICcEntryRepository _repository, IHttpContextAccessor _httpContext) : ICcEntryService
    {

        public async Task<ResponseList<LOT_CC_ENTRY_DTO>> GetCcEntry(string deliveryNumber)
        {
            ResponseList<LOT_CC_ENTRY_DTO> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GetCcEntry(deliveryNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_CC_ENTRY_DTO>();
                                
                var EO = response.Data.FirstOrDefault(x => x.HAS_EO.Equals("N", StringComparison.OrdinalIgnoreCase));

                if(EO is not null)
                    return response.Conflict(httpContext.Language switch
                    {
                        LANGUAGE.SPANISH.Id => $"EO bloqueado {EO.LOT_NUMBER} {EO.EO_NUMBER}",
                        LANGUAGE.KOREAN.Id  => $"EO 차단됨 {EO.LOT_NUMBER} {EO.EO_NUMBER}",
                        _                   => $"EO blocked {EO.LOT_NUMBER} {EO.EO_NUMBER}"
                    });
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetCcEntry(string deliveryNumber)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetCcEntry(deliveryNumber, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

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