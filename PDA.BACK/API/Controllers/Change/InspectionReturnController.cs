using Microservices.Interfaces.Change;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Change
{
    [ApiController]
    [Route("api/Change/[controller]")]
    [ApiExplorerSettings(GroupName = "Change")]
    public class InspectionReturnController(IInspectionReturnService _service) : ControllerBase
    {

        [HttpPost]
        [Route("SetRetTransferVD/{LotNo}")]
        public async Task<ActionResult> SetRetTransferVD([FromRoute] string LotNo)
        {
            var response = await _service.SetRetTransferVD(LotNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}
