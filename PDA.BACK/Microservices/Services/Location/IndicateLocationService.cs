using HWMX.DotNet;
using HWMX.DotNet.ORM; 
using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Database.Location;
using Repositories.Interfaces.Location;

namespace Microservices.Services.Location
{
    public class IndicateLocationService(IIndicateLocationRepository _repository, IHttpContextAccessor _httpContext) : IIndicateLocationService
    {
        
        public async Task<ResponseList<LOT_INFORMATION_DTO>> GetLotListByCaseLabel(string caseLabel)
        {
            ResponseList<LOT_INFORMATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotListByCaseLabel(caseLabel);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_INFORMATION_DTO>(); 
                 
                if (response.Data.Any() && $"{response.Data[0]?.STORAGE_CODE ?? string.Empty}".EndsWith("000"))
                    return response.Conflict("Cannot locate <b>CY</b> Material"); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<string>> GetMaterialByLocation(string location)
        {
            ResponseList<string> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetMaterialByLocation(location);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList); 

                response.Data = [.. 
                    responseProcedure
                    .GetTable<RACK_LOCATION_MATERIAL_DTO>()
                    .Select(x => x.PART_NUMBER)
                    .Distinct()
                    .Order()
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseDTO<string>> SetLotsInLocation(string storageCode, string location, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetLotsInLocation(storageCode, location, lotNumberList, httpContext.User);

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


        public async Task<ResponseDTO<string>> SetInventoryCell(string location, string[] lotLocationList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetInventoryCell(httpContext.User, location, lotLocationList);

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