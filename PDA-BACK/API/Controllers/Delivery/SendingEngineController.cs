using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers.Delivery
{
    [ApiController]
    [Route("api/Delivery/[controller]")]
    [ApiExplorerSettings(GroupName = "Delivery")]
    public class SendingEngineController(ISendingEngineService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetOrderList()
        {
            var response = await _service.GetOrderList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpGet]
        [Route("[action]/{orderNumber}/{engineCode}")]
        public async Task<ActionResult> GetEngineByOrder([FromRoute] string orderNumber, string engineCode)
        {
            var response = await _service.GetEngineByOrder(orderNumber, engineCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{orderNumber}")]
        public async Task<ActionResult> SetGlovisOrder([FromRoute] string orderNumber)
        {
            var response = await _service.SetGlovisOrder(orderNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 