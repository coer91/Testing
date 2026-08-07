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
        public async Task<ActionResult> GetLpEntry([FromRoute] string vbelg)
        {
            var response = await _service.GetLpEntry(vbelg);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{vbelg}")]
        public async Task<ActionResult> SetLpEntry([FromRoute] string vbelg)
        {
            var response = await _service.SetLpEntry(vbelg);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}