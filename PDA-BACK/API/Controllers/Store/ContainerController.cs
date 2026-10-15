using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Store
{
    [ApiController]
    [Route("api/Store/[controller]")]
    [ApiExplorerSettings(GroupName = "Store")]
    public class ContainerController(IContainerService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{orderNumber}")]
        public async Task<ActionResult> GetContainerDownload([FromRoute] string orderNumber)
        {
            var response = await _service.GetContainerDownload(orderNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{orderNumber}")]
        public async Task<ActionResult> SetContainerDownload([FromRoute] string orderNumber, [FromBody] string[] caseLabelList)
        {
            var response = await _service.SetContainerDownload(orderNumber, caseLabelList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpGet]
        [Route("[action]/{orderNumber}")]
        public async Task<ActionResult> GetContainerLoad([FromRoute] string orderNumber)
        {
            var response = await _service.GetContainerLoad(orderNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpPost]
        [Route("[action]/{orderNumber}")]
        public async Task<ActionResult> SetContainerLoad([FromRoute] string orderNumber, [FromBody] string[] caseLabelList)
        {
            var response = await _service.SetContainerLoad(orderNumber, caseLabelList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> CheckContainerOrder([FromQuery] string orderNumber, string caseLabel)
        {
            var response = await _service.CheckContainerOrder(orderNumber, caseLabel);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 