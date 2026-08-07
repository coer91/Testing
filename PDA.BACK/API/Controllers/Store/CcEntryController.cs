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
        public async Task<ActionResult> GetCcEntry([FromRoute] string deliveryNumber)
        {
            var response = await _service.GetCcEntry(deliveryNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{deliveryNumber}")]
        public async Task<ActionResult> SetCcEntry([FromRoute] string deliveryNumber)
        {
            var response = await _service.SetCcEntry(deliveryNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 
    }
} 