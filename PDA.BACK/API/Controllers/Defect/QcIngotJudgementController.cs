using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class QcIngotJudgementController(IQcIngotJudgementService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetMaterialInfo_QC/{Serial}")]
        public async Task<ActionResult> GetMaterialInfo_QC([FromRoute] string Serial)
        {
            var response = await _service.GetMaterialInfo_QC(Serial);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("SetIngotQcJudge/{Serial}")]
        public async Task<ActionResult> SetIngotQcJudge([FromRoute] string Serial, [FromQuery] string MatId, string LastOp, int JudgeWeight)
        {
            var response = await _service.SetIngotQcJudge(Serial, MatId, LastOp, JudgeWeight);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}