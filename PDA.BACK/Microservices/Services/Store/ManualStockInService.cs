using Microservices.Interfaces.Store;
using Repositories.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Store
{
    public class ManualStockInService(IManualStockInRepository _repository, IHttpContextAccessor _httpContext) : IManualStockInService
    {
        public async Task<ResponseDTO<string>> SetManualIn(string lotNumber, string partNumber, string qty, string unit, string prodDate, string eoNumber, string vendorId, string warehouse, string model)
        {
            ResponseDTO<string> response = new();

            try
            {
                if (string.IsNullOrWhiteSpace(lotNumber))
                    return response.BadRequest("LotNumber is required");

                if (string.IsNullOrWhiteSpace(partNumber))
                    return response.BadRequest("PartNumber is required");

                if (string.IsNullOrWhiteSpace(qty))
                    return response.BadRequest("Qty is required");

                if (string.IsNullOrWhiteSpace(prodDate))
                    return response.BadRequest("ProdDate is required"); 

                if (string.IsNullOrWhiteSpace(eoNumber))
                    return response.BadRequest("EO number is required");

                if (string.IsNullOrWhiteSpace(vendorId))
                    return response.BadRequest("VendorId is required");

                if (string.IsNullOrWhiteSpace(warehouse))
                    return response.BadRequest("Warehouse is required");

                if (string.IsNullOrWhiteSpace(model))
                    return response.BadRequest("Model number is required"); 

                string user = _httpContext.ToHttpRequest().User; 
                ResponseProcedure responseProcedure = await _repository.SetManualIn(lotNumber, partNumber, qty, unit, prodDate, eoNumber, vendorId, warehouse, model, user);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.Error(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 