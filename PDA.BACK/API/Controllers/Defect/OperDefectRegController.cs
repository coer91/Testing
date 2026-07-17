using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class OperDefectRegController(IOperDefectRegService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetSerialNoInfo/{LineCode}/{MatId}/{SerialNo}")]
        public async Task<ActionResult> GetSerialNoInfo([FromRoute] string LineCode, string MatId, string SerialNo)
        {
            var response = await _service.GetSerialNoInfo(LineCode, MatId, SerialNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("SetDefectRequest/{SerialNo}")]
        public async Task<ActionResult> SetDefectRequest([FromRoute] string SerialNo, [FromQuery] string OPCode, string MatID, string DEF_M_CD, string DEF_D_CD)
        {
            var response = await _service.SetDefectRequest(SerialNo, OPCode, MatID, DEF_M_CD, DEF_D_CD);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}