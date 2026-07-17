using Microservices.Interfaces.Shortage;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Shortage
{
    [ApiController]
    [Route("api/Shortage/[controller]")]
    [ApiExplorerSettings(GroupName = "Shortage")]
    public class InventoryCheckInCellController(IInventoryCheckInCellService _service) : ControllerBase
    { 

        [HttpGet]
        [Route("[action]/{caseLabelId}")]
        public async Task<ActionResult> GetCaseLotInfo([FromRoute] string caseLabelId)
        {
            var response = await _service.GetCaseLotInfo(caseLabelId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{location}")]
        public async Task<ActionResult> SetInventoryCellMulti([FromRoute] string location, [FromBody] string[] lotLocationList)
        {
            var response = await _service.SetInventoryCellMulti(location, lotLocationList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 