using AutoMapper;
using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Interfaces.Lot;

namespace Microservices.Services.Lot
{
    public class InventoryInspectionService(IInventoryInspectionRepository _repository, IMapper _mapper, IHttpContextAccessor _httpContext) : IInventoryInspectionService
    {

        public async Task<ResponseList<InspectionNumberDTO>> GetInspNumberList(string storageCode = "", int range = 15)
        {
            ResponseList<InspectionNumberDTO> response = new();

            try
            {
                string fromDate = DateTime.Now.AddDays(-range).ToString("yyyyMMdd");
                string toDate   = DateTime.Now.ToString("yyyyMMdd");

                List<MES_INV_LOT_INSP_DA> MES_INV_LOT_INSP_DA = await _repository.GetInspNumberList(x 
                    => x.APPLY_FLAG == "N"
                    && (string.IsNullOrWhiteSpace(storageCode) || x.STORAGE_CODE == storageCode)
                    && !string.IsNullOrWhiteSpace(x.INSP_DATE)
                    && string.Compare(x.INSP_DATE, fromDate) >= 0
                    && string.Compare(x.INSP_DATE, toDate) <= 0
                ); 

                response.Data = _mapper.Map<List<InspectionNumberDTO>>(MES_INV_LOT_INSP_DA);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> MoveLot(string lotNumber, string storageCode)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.MoveLot(lotNumber, storageCode, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (!response.Data.Equals("OK", StringComparison.OrdinalIgnoreCase))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetInspection(string storageCode, string inspection, string[] lotList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetInspection(storageCode, inspection, lotList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_VAL");

                if (!response.Data.Equals("OK", StringComparison.OrdinalIgnoreCase))
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