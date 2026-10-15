using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using Repositories.Database.Store;
using Repositories.Interfaces.Store; 

namespace Microservices.Services.Store
{
    public class TemporalStockService(ITemporalStockRepository _repository, IHttpContextAccessor _httpContext) : ITemporalStockService
    { 

        public async Task<ResponseList<TEMPORAL_STOCK_DTO>> GetTemporalStock(string operation)
        {
            ResponseList<TEMPORAL_STOCK_DTO> response = new();

            try
            { 
                ResponseProcedure responseProcedure = await _repository.GetTemporalStock(operation);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<TEMPORAL_STOCK_DTO>();
                
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetTemporalStock(string operation, TEMPORAL_STOCK_DTO lotDTO)
        {
            ResponseDTO<string> response = new();

            try
            { 
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetTemporalStock(
                    operation,
                    lotDTO.BARCODE,
                    lotDTO.LOT_NUMBER,
                    lotDTO.PART_NUMBER,
                    lotDTO.EO_NUMBER,
                    lotDTO.QTY,
                    lotDTO.UNIT,
                    lotDTO.STORAGE_CODE,
                    lotDTO.VENDOR_CODE,
                    lotDTO.PRODUCTION_DATE,
                    lotDTO.ERP_CODE,
                    lotDTO.DELIVERY_SLIP,
                    lotDTO.DELIVERY_ITEM,
                    lotDTO.CATEGORY,
                    lotDTO.MODEL,
                    lotDTO.CORP,
                    lotDTO.SHIP,
                    lotDTO.CONTAINER,
                    httpContext.User
                );

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


        public async Task<ResponseDTO<string>> DeleteTemporalStock(string operation, string barcode)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.DeleteTemporalStock(operation, barcode, httpContext.User);

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


        public async Task<ResponseDTO<string>> ClearTemporalStock(string operation)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.ClearTemporalStock(operation, httpContext.User);

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