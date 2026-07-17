using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class MaterialInputController(IMaterialInputService _service) : ControllerBase
    {
        [HttpGet]
        [Route("SetScrapAreaInput/{ErrNo}/{LotNo}")]
        public async Task<ActionResult> SetScrapAreaInput([FromRoute] string ErrNo, string LotNo)
        {
            var response = await _service.SetScrapAreaInput(ErrNo, LotNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("GetNGStatusInfo/{Lot}/{LotType}")]
        public async Task<ActionResult> GetNGStatusInfo([FromRoute] string Lot, string LotType)
        {
            var response = await _service.GetNGStatusInfo(Lot, LotType);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}