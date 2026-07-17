using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class DcRegistScrapController(IDcRegistScrapService _service) : ControllerBase
    {
        [HttpGet]
        [Route("DcRegistScrap/{Serial}")]
        public async Task<ActionResult> GetDieScrapSerial([FromRoute] string Serial)
        {
            var response = await _service.GetDieScrapSerial(Serial);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("SetDCStocktaking")]
        public async Task<ActionResult> SetDCStocktaking([FromBody] List<string> serialList)
        {
            var response = await _service.SetDCStocktaking(serialList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}
