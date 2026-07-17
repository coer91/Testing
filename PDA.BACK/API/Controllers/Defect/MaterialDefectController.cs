using Microservices.Interfaces.Defect;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Defect
{
    [ApiController]
    [Route("api/Defect/[controller]")]
    [ApiExplorerSettings(GroupName = "Defect")]
    public class MaterialDefectController(IMaterialDefectService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetLotInfo/{LotNo}")]
        public async Task<ActionResult> GetLotInfo([FromRoute] string LotNo)
        {
            var response = await _service.GetLotInfo(LotNo);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("SetMatDefectRequest/{LotNo}")]
        public async Task<ActionResult> SetMatDefectRequest([FromRoute] string LotNo,[FromQuery] string StorageCd,  string DEF_M_CD, string DEF_D_CD)
        {
            var response = await _service.SetMatDefectRequest(LotNo, StorageCd, DEF_M_CD, DEF_D_CD);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}