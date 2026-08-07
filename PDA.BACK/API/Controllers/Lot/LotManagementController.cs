using Microservices.Interfaces.Lot;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Lot
{
    [ApiController]
    [Route("api/Lot/[controller]")]
    [ApiExplorerSettings(GroupName = "Lot")]
    public class LotManagementController(ILotManagementService _service) : ControllerBase
    {

        [HttpPost]
        [Route("[Action]")]
        public async Task<ActionResult> Join([FromQuery] string paperType, string printer, [FromBody] string[] lotNumberList)
        {
            var response = await _service.Join(paperType, printer, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[Action]")]
        public async Task<ActionResult> Split([FromQuery] string lotNumber, int qty, string paperType, string printer)
        {
            var response = await _service.Split(lotNumber, qty, paperType, printer);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}