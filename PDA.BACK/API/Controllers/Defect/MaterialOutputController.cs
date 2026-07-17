using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{   
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class MaterialOutputController(IMaterialOutputService _service) : ControllerBase
    {
        [HttpGet]
        [Route("SetScrapAreaOutput/{ErrNo}/{LotNo}")]
        public async Task<ActionResult> SetScrapAreaOutput([FromRoute] string ErrNo, string LotNo)
        {
            var response = await _service.SetScrapAreaOutput(ErrNo, LotNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("GetNGStatusInfoOut/{LotNo}/{LotType}")]
        public async Task<ActionResult> GetNGStatusInfoOut([FromRoute] string LotNo, string LotType)
        {
            var response = await _service.GetNGStatusInfoOut(LotNo, LotType);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}