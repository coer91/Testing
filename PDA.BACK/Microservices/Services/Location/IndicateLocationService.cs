using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using Repositories.Interfaces.Location;

namespace Microservices.Services.Location
{
    public class IndicateLocationService(IIndicateLocationRepository _repository, IHttpContextAccessor _httpContext) : IIndicateLocationService
    {
        
        public async Task<ResponseList<DataSourceDTO>> GetCaseLabelLocation(string caseLabel)
        {
            ResponseList<DataSourceDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetCaseLabelLocation(caseLabel);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var data = responseProcedure.GetTable<dynamic>(); 
                 
                if (data.Count > 0&& $"{data[0]?.STORAGE_CODE ?? string.Empty}".EndsWith("000"))
                    return response.Conflict("Cannot locate CY Material");

                response.Data = [..
                    data.Select(x => new DataSourceDTO
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
                    .GetTable<dynamic>()
                    .Select(x => $"{x.PART_NUMBER}")
                    .Order()
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        //public async Task<ResponseDTO<string>> PartNumberLocationMatching(string location, string partNumber)
        //{
        //    ResponseDTO<string> response = new();

        //    try
        //    {
        //        ResponseProcedure responseProcedure = await _repository.PartNumberLocationMatching(location, partNumber);

        //        if (responseProcedure.Failure)
        //            return response.Error(responseProcedure.MessageList);

        //        response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

        //        if (response.Data != "OK")
        //            return response.Conflict(response.Data);
        //    }

        //    catch (Exception ex)
        //    {
        //        return response.Exception(ex);
        //    }

        //    return response;
        //}


        public async Task<ResponseDTO<string>> SetLotsInLocation(string storageCode, string location, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetLotsInLocation(storageCode, location, lotNumberList, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");

                if (response.Data != "OK")
                    return response.Conflict(response.Data);

                response.Data = "The Lots has been successfully saved";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 