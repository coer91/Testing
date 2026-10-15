using Microservices.Interfaces.Delivery;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Delivery
{
    [ApiController]
    [Route("api/Delivery/[controller]")]
    [ApiExplorerSettings(GroupName = "Delivery")]
    public class CCDeliveryController(ICcDeliveryService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetGlovisDeliveryList()
        {
            var response = await _service.GetGlovisDeliveryList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[action]/{lotNumber}")]
        public async Task<ActionResult> GetLotInformationGlovis([FromRoute] string lotNumber)
        {
            var response = await _service.GetLotInformationGlovis(lotNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> GenerateGlovisDelvNum()
        {
            var response = await _service.GenerateGlovisDelvNum();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPost]
        [Route("[action]/{deliveryNumber}")]
        public async Task<ActionResult> DeliveryGlovisOrder([FromRoute] string deliveryNumber, [FromBody] string[] lotNumberList)
        {
            var response = await _service.DeliveryGlovisOrder(deliveryNumber, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault()); 

            return Ok(response.Data);
        }
    }
} 