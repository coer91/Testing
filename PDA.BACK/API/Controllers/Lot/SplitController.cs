using Microservices.Interfaces.Lot;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Lot
{
    [ApiController]
    [Route("api/Lot/[controller]")]
    [ApiExplorerSettings(GroupName = "Lot")]
    public class SplitController(ISplitService _service) : ControllerBase
    {
        [HttpPost]
        [Route("[Action]")]
        public async Task<ActionResult> SplitLot([FromQuery] string lotNumber, int qty, string paperType, string printer)
        {
            var response = await _service.SplitLot(lotNumber, qty, paperType, printer);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}