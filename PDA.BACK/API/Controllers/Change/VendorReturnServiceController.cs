using Microservices.Interfaces.Change;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Change
{
    [ApiController]
    [Route("api/Change/[controller]")]
    [ApiExplorerSettings(GroupName = "Change")]
    public class VendorReturnServiceController(IVendorReturnService _service) : ControllerBase
    {


        [HttpGet]
        [Route("GetReturnPO/{Vendor}")]
        public async Task<ActionResult> GetReturnPO([FromRoute] string Vendor)
        {
            var response = await _service.GetReturnPO(Vendor);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("SetRetVendor/{RetPO}")]
        public async Task<ActionResult> SetRetVendor([FromRoute] string RetPO, [FromBody] List<string> list_LOT_No)
        {
            var response = await _service.SetRetVendor(RetPO, list_LOT_No);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("GetReturnRequest/{RetPO}")]
        public async Task<ActionResult> GetReturnRequest([FromRoute] string RetPO)
        {
            var response = await _service.GetReturnRequest(RetPO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}
