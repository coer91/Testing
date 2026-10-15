using Microservices.Interfaces.Store;
using Repositories.Interfaces.Store;
using Repositories.Database.Store;
using Microsoft.AspNetCore.Http; 
using HWMX.DotNet.ORM;  
using HWMX.DotNet;

namespace Microservices.Services.Store
{
    public class LpEntryService(ILpEntryRepository _repository, IHttpContextAccessor _httpContext) : ILpEntryService
    { 

        public async Task<ResponseList<LOT_LP_ENTRY_DTO>> GetLpEntry(string vbelg)
        {
            ResponseList<LOT_LP_ENTRY_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLpEntry(vbelg);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_LP_ENTRY_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<string>> SetLpEntry(string vbelg)
        {
            ResponseDTO<string> response = new();
            try
            {
                HttpRequestDTO httpContext = _httpContext.ToHttpRequest();
                ResponseProcedure responseProcedure = await _repository.SetLpEntry(vbelg, httpContext.User);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetOutput("IO_MESSAGE");

                if (response.Data != "OK")
                    return response.BadRequest(response.Data);

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