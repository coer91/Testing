using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Delivery
{
    [ApiController]
    [Route("api/Delivery/[controller]")]
    [ApiExplorerSettings(GroupName = "Delivery")]
    public class PermitGateController(IPermitGateService _service) : ControllerBase
    {
        [HttpGet]
        [Route("[action]/{shippingNumber}")]
        public async Task<ActionResult> GetGatePermit([FromRoute] string shippingNumber)
        {
            var response = await _service.GetGatePermit(shippingNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{shippingNumber}/{factory}")]
        public async Task<ActionResult> SetGatePermit([FromRoute] string shippingNumber, string factory)
        {
            var response = await _service.SetGatePermit(factory, shippingNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("[action]/{shippingNumber}")]
        public async Task<ActionResult> GetGatePermitDetail([FromRoute] string shippingNumber)
        {
            var response = await _service.GetGatePermitDetail(shippingNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}