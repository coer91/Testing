using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Database.Location;
using Repositories.Interfaces.Location;

namespace Microservices.Services.Location
{
    public class MoveMaterialService(IMoveMaterialRepository _repository, IHttpContextAccessor _httpContext) : IMoveMaterialService
    {
        public async Task<ResponseList<MATERIAL_ISSUE_DTO>> GetIssueReq(string issueNumber)
        {
            ResponseList<MATERIAL_ISSUE_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetIssueReq(issueNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);   
                
                response.Data = responseProcedure.GetTable<MATERIAL_ISSUE_DTO>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<LOT_INFORMATION_DTO>> GetMaterialFIFO(string lotNumber)
        {
            ResponseList<LOT_INFORMATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetMaterialFIFO(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_INFORMATION_DTO>();

                var lot = response.Data.FirstOrDefault(x => x.LOT_NUMBER.Equals(lotNumber)); 

                response.Data = [.. 
                    response.Data
                        .Where(x => (DateTime)x.INPUT_DATE.ToDateTime("yyyyMMdd") < (DateTime)lot.INPUT_DATE.ToDateTime("yyyyMMdd"))
                        .OrderBy(x => x.INPUT_DATE).ThenBy(x => x.PRODUCTION_DATE)
                        .Select(x => new LOT_INFORMATION_DTO { 
                            LOT_NUMBER      = x.LOT_NUMBER,
                            PART_NUMBER     = x.PART_NUMBER,
                            EO_NUMBER       = x.EO_NUMBER,
                            QTY             = x.QTY,
                            STORAGE_CODE    = x.STORAGE_CODE,
                            LOCATION        = x.LOCATION,
                            INPUT_DATE      = x.INPUT_DATE is not null ? ((DateTime) x.INPUT_DATE.ToDateTime("yyyyMMdd")).ToFormatMDY() : string.Empty,
                            PRODUCTION_DATE = x.PRODUCTION_DATE is not null ? ((DateTime) x.PRODUCTION_DATE.ToDateTime("yyyyMMdd")).ToFormatMDY() : string.Empty
                        })
                ]; 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseDTO<string>> MoveMaterialList(string issueNumber, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.MoveMaterialList(issueNumber, lotNumberList, httpContext.User);

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