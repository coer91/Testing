using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Interfaces.Location;

namespace Microservices.Services.Location
{
    public class TrollyConfigurationService(ITrollyConfigurationRepository _repository, IHttpContextAccessor _httpContext) : ITrollyConfigurationService {
        

        public async Task<ResponseList<TROLLY_ORDER_DTO>> GetTrollyOrder(string productionDate, int sequencePlan, string trollyGroup)
        {
            ResponseList<TROLLY_ORDER_DTO> response = new();

            try
            {
                if(string.IsNullOrWhiteSpace(productionDate))
                    return response.BadRequest("Production date is required");

                if(sequencePlan <= 0)
                    return response.BadRequest("Sequence plan is required");

                if(string.IsNullOrWhiteSpace(trollyGroup))
                    return response.BadRequest("Trolly group is required");

                ResponseProcedure responseProcedure = await _repository.GetTrollyOrder(productionDate, sequencePlan, trollyGroup);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<TROLLY_ORDER_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<TROLLY_LOT_DTO>> GetLotInTrolly(string lotNumber)
        {
            ResponseDTO<TROLLY_LOT_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotInTrolly(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<TROLLY_LOT_DTO>().FirstOrDefault(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetOrderTrolly(string productionDate, int sequencePlan, IEnumerable<string> lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(productionDate))
                    return response.BadRequest("Production date is required");

                if (sequencePlan <= 0)
                    return response.BadRequest("Sequence plan is required");

                if (lotNumberList.Count() <= 0)
                    return response.BadRequest("No Lots provided");
                               
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetOrderTrolly(productionDate, sequencePlan, lotNumberList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

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