using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class ReworkJudgementController(IReworkJudgementService _service) : ControllerBase
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

        [HttpGet]
        [Route("SetQmRework/{ErrNo}/{SerialNo}")]
        public async Task<ActionResult> SetQmRework([FromRoute] string ErrNo, [FromRoute] string SerialNo)
        {
            var response = await _service.SetQmRework(ErrNo, SerialNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}

