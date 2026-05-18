using Microservices.Interfaces;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{
    [ApiController]
    [Route("api/Master")]
    public class MasterController(IMasterService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetRackLocationList")]
        public async Task<ActionResult> GetRackLocationList()
        {
            var response = await _service.GetRackLocationList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 