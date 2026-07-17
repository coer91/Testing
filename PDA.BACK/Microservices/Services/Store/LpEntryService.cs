using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.DTOs;
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using Repositories.Interfaces.Store;

namespace Microservices.Services.Store
{
    public class LpEntryService(ILpEntryRepository _repository, IHttpContextAccessor _httpContext) : ILpEntryService
    { 

        public async Task<ResponseList<LotInformationDTO>> GetLPStockIn(string vbelg)
        {
            ResponseList<LotInformationDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLPStockIn(vbelg);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new LotInformationDTO
                    {
                        LotNumber  = x.LOTNO,
                        PartNumber = x.PART_NO,
                        EoNumber   = x.EO_NO,
                        Qty        = int.TryParse($"{x?.QTY}", out int _qty) ? _qty : 0,        
                    })
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetLPStockIn(string vbelg)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetLPStockIn(vbelg, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

                response.Data = "LP Entry Successfully";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 