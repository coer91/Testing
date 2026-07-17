using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Http; 
using Repositories.Interfaces.Delivery;

namespace Microservices.Services.Delivery
{
    public class CcDeliveryServiceService(
        ICcDeliveryRepository _repository,
        IMasterService _masterService,
        IHttpContextAccessor _httpContext
    ) : ICcDeliveryService {
        
        public async Task<ResponseList<string>> GetGlovisDeliveryNumberList()
        {
            ResponseList<string> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetGlovisDeliveryNumberList();

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList); 

                //Response 
                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => $"{x.DLV_NO}")
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<LotInformationDTO>> GetLotInfoCC(string lotNumber)
        {
            ResponseDTO<LotInformationDTO> response = new();

            try
            { 
                //Get Lot Information from Master Service
                response = await _masterService.GetLotInformation(lotNumber);

                if(response.Failure)
                    return response.Error(response.MessageList, response.HttpCode);

                if (response.Data.IsDeleted)
                    return response.Conflict("This lot has been deleted");

                if (response.Data.HasDefect)
                    return response.Conflict("This lot has defects");

                if (!response.Data.StorageCode.EndsWith("100") && !response.Data.StorageCode.EndsWith("110"))
                    return response.Conflict($"This lot is in <b>{response.Data.StorageCode}</b>");

                //Get Lot Information from CC Delivery
                ResponseProcedure responseProcedure = await _repository.GetLotInfoCC(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var data = responseProcedure.GetTable<dynamic>();

                if (data.Count <= 0)
                    return response.NotFound();

                if ($"{data[0]?.MAT_LOT_NO}".Equals("NOT RECEIVED"))
                    return response.Conflict("Lot is in another order");

                if ($"{data[0]?.MAT_LOT_NO}".Equals("GLOVISCC"))
                    return response.Conflict("Lot is located in GLOVIS");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> DeliveryOrder(string deliveryNumber, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.DeliveryOrder(deliveryNumber, lotNumberList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 