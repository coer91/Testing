using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class GetScrapAreaLotInfoController(IScrapAreaLotSplitService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetScrapAreaLotInfo/{LotNo}")]
        public async Task<ActionResult> GetScrapAreaLotInfo([FromRoute] string LotNo)
        {
            var response = await _service.GetScrapAreaLotInfo(LotNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}