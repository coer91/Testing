using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers.Store
{
    [ApiController]
    [Route("api/Store/[controller]")]
    [ApiExplorerSettings(GroupName = "Store")]
    public class ManualStockInController(IManualStockInService _service) : ControllerBase
    {

        [HttpPost]
        [Route("[action]")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> SetManualIn([FromQuery] string lotNumber, string partNumber, string qty, string unit, string prodDate, string eoNumber, string company, string warehouse, string model)
        {
            var response = await _service.SetManualIn(lotNumber, partNumber, qty, unit, prodDate, eoNumber, company, warehouse, model);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 