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
        public async Task<ActionResult> GetGlovisDeliveryNumberList()
        {
            var response = await _service.GetGlovisDeliveryNumberList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        //[HttpGet]
        //[Route("[action]/{lotNumber}")]
        //public async Task<ActionResult> GetLotInfoCC([FromRoute] string lotNumber)
        //{
        //    var response = await _service.GetLotInfoCC(lotNumber);

        //    if (response.Failure)
        //        return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

        //    return Ok(response.Data);
        //}


        [HttpPost]
        [Route("[action]/{deliveryNumber}")]
        public async Task<ActionResult> DeliveryOrder([FromRoute] string deliveryNumber, [FromBody] string[] lotNumberList)
        {
            var response = await _service.DeliveryOrder(deliveryNumber, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault()); 

            return Ok(response.Data);
        }
    }
} 