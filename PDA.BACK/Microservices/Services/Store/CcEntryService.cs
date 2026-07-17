using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using Repositories.Interfaces.Store;

namespace Microservices.Services.Store
{
    public class CcEntryService(ICcEntryRepository _repository, IHttpContextAccessor _httpContext) : ICcEntryService
    {

        public async Task<ResponseList<DataSourceDTO>> GetCCStockIn(string deliveryNumber)
        {
            ResponseList<DataSourceDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetCCStockIn(deliveryNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var data = responseProcedure.GetTable<dynamic>().Select(x => new
                {
                    LotNumber   = $"{x.LOT_NO}",
                    PartNumber  = $"{x.PART_NO}",
                    EoNumber    = $"{x.EO_NO}",
                    Qty         = int.TryParse($"{x?.QTY}", out int _qty) ? _qty : 0,
                    UseEO       = $"{x.EO_USE_FLAG}",
                    Status      = $"{x.STATUS}"
                });

                if (!data.Any(x => x.Status.Equals("NOT RECEIVED", StringComparison.OrdinalIgnoreCase)))
                    return response.Conflict("Order already received");

                var EO = data.FirstOrDefault(x => x.UseEO.Equals("N", StringComparison.OrdinalIgnoreCase));

                if(EO is not null)
                    return response.Conflict($"EO blocked {EO.LotNumber} {EO.EoNumber}");

                //Response 
                response.Data = [.. 
                    data.Select(x => new DataSourceDTO
                    {
                        LotNumber  = x.LotNumber,
                        PartNumber = x.PartNumber,
                        EoNumber   = x.EoNumber,
                        Qty        = x.Qty
                    })
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetCCStockIn(string deliveryNumber)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetCCStockIn(deliveryNumber, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

                response.Data = "The order has been successfully saved";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 