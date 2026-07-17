using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class ReworkApprovalController(IReworkApprovalService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetReworkInfo/{SerialNo}/{Type}")]
        public async Task<ActionResult> GetReworkInfo([FromRoute] string SerialNo, [FromRoute] string Type)
        {
            var response = await _service.GetReworkInfo(SerialNo, Type);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("SetQmReworkApprov/{ErrNo}")]
        public async Task<ActionResult> SetQmReworkApprov([FromRoute] string ErrNo, [FromQuery] string NGNotes)
        {
            var response = await _service.SetQmReworkApprov(ErrNo, NGNotes);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}