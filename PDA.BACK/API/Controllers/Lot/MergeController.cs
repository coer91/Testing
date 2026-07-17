using Microservices.DTOs;
using Microservices.Interfaces.Lot;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Lot
{
    [ApiController]
    [Route("api/Lot/[controller]")]
    [ApiExplorerSettings(GroupName = "Lot")]
    public class MergeController(IMergeService _service) : ControllerBase
    {
        [HttpPost]
        [Route("[Action]")]
        public async Task<ActionResult> MergeLot([FromQuery] string paperType, string printer, [FromBody] LotInformationDTO[] lotNumberList)
        {
            var response = await _service.MergeLot(paperType, printer, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}