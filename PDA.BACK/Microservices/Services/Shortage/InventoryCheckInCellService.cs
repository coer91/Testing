using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces.Shortage;
using Microsoft.AspNetCore.Http; 
using Repositories.Interfaces.Shortage;

namespace Microservices.Services.Shortage
{
    public class InventoryCheckInCellService(IInventoryCheckInCellRepository _repository, IHttpContextAccessor _httpContext) : IInventoryCheckInCellService
    {  

        public async Task<ResponseList<DataSourceDTO>> GetCaseLotInfo(string caseLabelId)
        {
            ResponseList<DataSourceDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetCaseLotInfo(caseLabelId);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);   

                //Response
                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new DataSourceDTO
                    {
                        LotNumber  = x.LOTNO,
                        PartNumber = x.PART_NO,
                        EoNumber   = x.EO_NO,
                        Qty        = int.TryParse($"{x?.QTY}", out int _qty) ? _qty : 0
                    })
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetInventoryCellMulti(string location, string[] lotLocationList)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetInventoryCellMulti(httpContext.User, location, lotLocationList);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("P_RETURN_MSG");
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    } 
} 