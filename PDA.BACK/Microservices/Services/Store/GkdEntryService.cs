using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using Repositories.Interfaces.Store; 

namespace Microservices.Services.Store
{
    public class GkdEntryService(IGkdEntryRepository _repository, IHttpContextAccessor _httpContext) : IGkdEntryService {

        public async Task<ResponseList<LotInformationAoneDTO>> GetKDLotInfo(string lotNumber)
        {
            ResponseList<LotInformationAoneDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetKDLotInfo(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList); 

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new LotInformationAoneDTO {
                        VBELG          = x.VBELG,
                        LotNumber      = $"{x.RESULT}".Equals("NG") ? x.RESULT : x.LOTNO,
                        PartNumber     = x.PART_NO,
                        EoNumber       = x.EO_NO,
                        Qty            = int.TryParse($"{x?.QTY}", out int _qty) ? _qty : 0,
                        Unit           = x.UNIT,  
                        VendorCode     = x.VD_CD,
                        ProductionDate = x.PROD_DATE 
                    })
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
         

        public async Task<ResponseDTO<string>> SetKdStockIn(List<LotInformationAoneDTO> lotList)
        {
            ResponseDTO<string> response = new();
            try
            {
                string LotNumber      = string.Join(";", lotList.Select(x => x.LotNumber));
                string PartNumber     = string.Join(";", lotList.Select(x => x.PartNumber));
                string EoNumber       = string.Join(";", lotList.Select(x => x.EoNumber));
                string Qty            = string.Join(";", lotList.Select(x => x.Qty));
                string Unit           = string.Join(";", lotList.Select(x => x.Unit));
                string VendorCode     = string.Join(";", lotList.Select(x => x.VendorCode));
                string ProductionDate = string.Join(";", lotList.Select(x => x.ProductionDate));
                
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetKdStockIn(LotNumber, PartNumber, Qty, Unit, ProductionDate, EoNumber, VendorCode, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

                response.Data = "GKD Entry Successfully";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }

        public async Task<ResponseDTO<string>> SetKdStockAoneIn(string vbelg)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetKdStockAoneIn(vbelg, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

                response.Data = "GKD AONE Entry Successfully";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
}