using Microservices.Interfaces.Location;
using Repositories.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Location
{
    public class MaterialMoveService(IMaterialMoveRepository _repository, IHttpContextAccessor _httpContext) : IMaterialMoveService
    {
        public async Task<ResponseList<dynamic>> GetMaterialByIssue(string issueNumber)
        {
            ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetMaterialByIssue(issueNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new
                    {
                        PartNumber  = x.PART_NO,
                        Qty         = int.TryParse($"{x?.REQ_QTY}", out int _qty) ? _qty : 0,
                        StorageCode = x.STORAGE_CODE,
                        InputDate   = Dates.ToFormatMDY($"{x.INPUTDATE}"),
                    })
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<dynamic>> GetMaterialFIFO(string lotNumber)
        {
            ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetMaterialFIFO(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var x = responseProcedure.GetTable<dynamic>(1);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new
                    {
                        LotNumber   = x.MAT_LOT_NO,
                        PartNumber  = x.PART_NO,
                        Location    = x.LOC_NO,
                        InputDate   = Dates.ToFormatMDY($"{x.INPUTDATE}"),
                    })
               ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<dynamic>> GetLotFIFO(string partNumber, string lotNumber)
        {
            ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotFIFO(partNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new
                    {
                        LotNumber      = x.LOTNO,
                        PartNumber     = x.PART_NO,
                        Qty            = int.TryParse($"{x?.QTY}", out int _qty) ? _qty : 0,
                        StorageCode    = x.STORAGE_CODE,
                        Location       = x.LOC_NO,
                        InputDate      = Dates.ToDateTime($"{x.IN_DATE}", "yyyyMMdd")?.ToFormatMDY()
                    })
                ];

                var lot = response.Data.FirstOrDefault(x => $"{x.LotNumber}".Equals(lotNumber, StringComparison.OrdinalIgnoreCase));

                if (lot is null)
                    return response.NotFound("No FIFO Data");

                response.Data = [.. response.Data.Where(x => Dates.ToDateTime(x.InputDate) <= Dates.ToDateTime(lot.InputDate))];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> MoveMaterial(string issueNumber, string[] lotNumberList)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.MoveMaterial(issueNumber, lotNumberList, httpContext.User);

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