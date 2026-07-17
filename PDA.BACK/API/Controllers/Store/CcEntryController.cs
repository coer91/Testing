using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Store
{

    [ApiController]
    [Route("api/Store/[controller]")]
    [ApiExplorerSettings(GroupName = "Store")]
    public class CcEntryController(ICcEntryService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{deliveryNumber}")]
        public async Task<ActionResult> GetCCStockIn([FromRoute] string deliveryNumber)
        {
            var response = await _service.GetCCStockIn(deliveryNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{deliveryNumber}")]
        public async Task<ActionResult> SetCCStockIn([FromRoute] string deliveryNumber)
        {
            var response = await _service.SetCCStockIn(deliveryNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 
    }
} 