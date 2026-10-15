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
        [Route("[action]/{PalletCode}")]
        public async Task<ActionResult> Get3CPalletInfo([FromRoute] string PalletCode)
        {
            var response = await _service.Get3CPalletInfo(PalletCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> SetFinalStocktaking([FromBody] string[] SerialNoList)
        {
            var response = await _service.SetFinalStocktaking(SerialNoList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}