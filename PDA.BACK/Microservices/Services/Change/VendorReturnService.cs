using Microservices.Interfaces.Change;
using Repositories.Interfaces.Change;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Change
{
    public class VendorReturnService(IVendorReturnRepository _repository, IHttpContextAccessor _httpContext) : IVendorReturnService
    {

        public async Task<ResponseList<dynamic>> GetReturnPO(string Vendor)
        {
            ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetReturnPO(Vendor);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<dynamic>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }

        public async Task<ResponseDTO<string>> SetRetVendor(string RetPO, List<string> list_LOT_No)
        {
            ResponseDTO<string> response = new();

            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetRetVendor(RetPO, list_LOT_No, httpContext.UserId.ToString());

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

        public async Task<ResponseList<dynamic>> GetReturnRequest(string RetPO)
        {
            ResponseList<dynamic> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetReturnRequest(RetPO);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<dynamic>();
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 