using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Location
{
    [ApiController]
    [Route("api/Location/[controller]")]
    [ApiExplorerSettings(GroupName = "Location")]
    public class EngineStocktakingController(IEngineStocktakingService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{palletCode}")]
        public async Task<ActionResult> GetPallet3C([FromRoute] string palletCode)
        {
            var response = await _service.GetPallet3C(palletCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> SetStocktaking([FromBody] string[] lotNumberList)
        {
            var response = await _service.SetStocktaking(lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault()); 

            return Ok(response.Data);
        }
    }
} 