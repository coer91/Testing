using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using Repositories.Database.Store;
using Repositories.Interfaces.Store; 

namespace Microservices.Services.Store
{
    public class GkdEntryService(IGkdEntryRepository _repository, IHttpContextAccessor _httpContext) : IGkdEntryService {

        public async Task<ResponseList<LOT_GKD_ENTRY_DTO>> GetKDLotInfo(string lotNumber)
        {
            ResponseList<LOT_GKD_ENTRY_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetKDLotInfo(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList); 

                response.Data = responseProcedure.GetTable<LOT_GKD_ENTRY_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
         

        public async Task<ResponseDTO<string>> SetKdStockIn(List<LOT_GKD_ENTRY_DTO> lotList)
        {
            ResponseDTO<string> response = new();
            try
            {
                string LotNumber      = string.Join(";", lotList.Select(x => x.LOT_NUMBER));
                string PartNumber     = string.Join(";", lotList.Select(x => x.PART_NUMBER));
                string Qty            = string.Join(";", lotList.Select(x => x.QTY));
                string EoNumber       = string.Join(";", lotList.Select(x => x.EO_NUMBER));
                string Unit           = string.Join(";", lotList.Select(x => x.UNIT));
                string VendorCode     = string.Join(";", lotList.Select(x => x.VENDOR_CODE));
                string ProductionDate = string.Join(";", lotList.Select(x => x.PRODUCTION_DATE));

                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetKdStockIn(LotNumber, PartNumber, Qty, Unit, ProductionDate, EoNumber, VendorCode, httpContext.User);

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


        public async Task<ResponseDTO<string>> SetKdStockAoneIn(string vbelg)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetKdStockAoneIn(vbelg, httpContext.User);

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