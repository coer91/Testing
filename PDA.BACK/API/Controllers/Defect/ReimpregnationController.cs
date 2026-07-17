using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class ReimpregnationController(IReimpregnationService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetLeakData/{MatNo}")]
        public async Task<ActionResult> GetLeakData([FromRoute] string MatNo)
        {
            var response = await _service.GetLeakData(MatNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("SetReimpHist/{MatNo}")]
        public async Task<ActionResult> SetReimpHist([FromRoute] string MatNo)
        {
            var response = await _service.SetReimpHist(MatNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}