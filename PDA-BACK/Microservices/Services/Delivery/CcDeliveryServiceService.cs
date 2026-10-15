using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Database.Delivery;
using Repositories.Interfaces.Delivery;

namespace Microservices.Services.Delivery
{
    public class CcDeliveryServiceService(
        ICcDeliveryRepository _repository,
        IHttpContextAccessor _httpContext
    ) : ICcDeliveryService {
        
        public async Task<ResponseList<GLOVIS_DELIVERY_ORDER_DTO>> GetGlovisDeliveryList()
        {
            ResponseList<GLOVIS_DELIVERY_ORDER_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetGlovisDeliveryList();

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetTable<GLOVIS_DELIVERY_ORDER_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<LOT_INFORMATION_DTO>> GetLotInformationGlovis(string lotNumber)
        {
            ResponseDTO<LOT_INFORMATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotInformationGlovis(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                //Response 
                response.Data = responseProcedure.GetTable<LOT_INFORMATION_DTO>().FirstOrDefault();

                if(response.Data is null || response.Data.LOT_NUMBER is null) 
                    return response.NotFound();

                if(response.Data.LOT_NUMBER.Equals("NOT RECEIVED"))
                    return response.Conflict("Lot is in another order");

                if (response.Data.LOT_NUMBER.Equals("GLOVISCC"))
                    return response.Conflict("Lot is located in GLOVIS");

                if (response.Data.STORAGE_CODE.EndsWith('_'))
                    return response.NotFound();

                if (!response.Data.STORAGE_CODE.EndsWith("100") && !response.Data.STORAGE_CODE.EndsWith("110"))
                    return response.Conflict($"This lot is in <b>{response.Data.STORAGE}</b>");
                 
                if (response.Data.IS_DELETED.Equals("Y"))
                    return response.Conflict("This lot has been deleted");

                if (response.Data.HAS_DEFECT.Equals("Y"))
                    return response.Conflict("This lot has defects");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<GLOVIS_DELIVERY_ORDER_DTO>> GenerateGlovisDelvNum()
        {
            ResponseDTO<GLOVIS_DELIVERY_ORDER_DTO> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.GenerateGlovisDelvNum(httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<GLOVIS_DELIVERY_ORDER_DTO>().FirstOrDefault();    
                
                if(response.Data is null)
                    return response.Error("Failed to generate delivery number");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> DeliveryGlovisOrder(string deliveryNumber, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.DeliveryGlovisOrder(deliveryNumber, lotNumberList, httpContext.User);

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