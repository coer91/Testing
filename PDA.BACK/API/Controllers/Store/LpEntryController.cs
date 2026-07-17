using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers.Store 
{
    [ApiController]
    [Route("api/Store/[controller]")]
    [ApiExplorerSettings(GroupName = "Store")]
    public class LpEntryController(ILpEntryService _service) : ControllerBase
    { 

        [HttpGet]
        [Route("[action]/{vbelg}")]
        public async Task<ActionResult> GetLPStockIn([FromRoute] string vbelg)
        {
            var response = await _service.GetLPStockIn(vbelg);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{vbelg}")]
        public async Task<ActionResult> SetLPStockIn([FromRoute] string vbelg)
        {
            var response = await _service.SetLPStockIn(vbelg);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}