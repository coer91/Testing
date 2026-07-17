using Microservices.Interfaces.Location;
using Repositories.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Location
{
    public class TrollyConfigurationService(ITrollyConfigurationRepository _repository, IHttpContextAccessor _httpContext) : ITrollyConfigurationService
    {

        public async Task<ResponseList<dynamic>> GetOrderTrolly(string productionDate, int sequencePlan, string trollyGroup)
        {
            ResponseList<dynamic> response = new();

            try
            {
                if(string.IsNullOrWhiteSpace(productionDate))
                    return response.BadRequest("Production date is required");

                if(sequencePlan <= 0)
                    return response.BadRequest("Sequence plan is required");

                if(string.IsNullOrWhiteSpace(trollyGroup))
                    return response.BadRequest("Trolly group is required");

                ResponseProcedure responseProcedure = await _repository.GetOrderTrolly(productionDate, sequencePlan, trollyGroup);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new
                    {
                        ProductionDate = Dates.ToDateTime($"{x?.PROD_DATE}", "yyyyMMdd")?.ToFormatMDY(),
                        PartNumber     = x.PART_NO,
                        Qty            = int.TryParse($"{x?.MAX_QTY}", out int _maxQty) ? _maxQty : 0,
                        QtyChecked     = int.TryParse($"{x?.REQ_QTY}", out int _reqQty) ? _reqQty : 0,
                    })
                ];
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

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 