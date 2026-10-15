using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using Repositories.Database.Lot;
using Repositories.Interfaces.Lot;

namespace Microservices.Services.Lot
{
    public class InventoryInspectionService(IInventoryInspectionRepository _repository, IHttpContextAccessor _httpContext) : IInventoryInspectionService
    {

        public async Task<ResponseList<INSPECTION_DTO>> GetInspectionNumberList(string storageCode, int range = 15)
        {
            ResponseList<INSPECTION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetInspectionNumberList(storageCode, range);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<INSPECTION_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> CreateInspectionNumber(string storageCode)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.CreateInspectionNumber(storageCode, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_VALUE");

                if (string.IsNullOrWhiteSpace(response.Data))
                    return response.Error();
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

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.Equals("OK", StringComparison.OrdinalIgnoreCase))
                    return response.Conflict(response.Data);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseDTO<string>> SetInspectionLot(string storageCode, string inspection, string[] lotList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetInspectionLot(storageCode, inspection, lotList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (!response.Data.Equals("OK", StringComparison.OrdinalIgnoreCase))
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