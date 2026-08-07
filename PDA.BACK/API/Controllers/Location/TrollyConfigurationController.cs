using Microservices.Interfaces.Location;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Location
{
    [ApiController]
    [Route("api/Location/[controller]")]
    [ApiExplorerSettings(GroupName = "Location")]
    public class TrollyConfigurationController(ITrollyConfigurationService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetTrollyOrder([FromQuery] string productionDate, int sequencePlan, string trollyGroup)
        {
            var response = await _service.GetTrollyOrder(productionDate, sequencePlan, trollyGroup);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[action]/{lotNumber}")]
        public async Task<ActionResult> GetLotInTrolly([FromRoute] string lotNumber)
        {
            var response = await _service.GetLotInTrolly(lotNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> SetOrderTrolly([FromQuery] string productionDate, int sequencePlan, IEnumerable<string> lotNumberList)
        {
            var response = await _service.SetOrderTrolly(productionDate, sequencePlan, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 