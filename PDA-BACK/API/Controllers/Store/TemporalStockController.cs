using Microservices.Interfaces.Store;
using Repositories.Database.Store;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Store
{

    [ApiController]
    [Route("api/Store/[controller]")]
    [ApiExplorerSettings(GroupName = "Store")]
    public class TemporalStockController(ITemporalStockService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{operation}")]
        public async Task<ActionResult> GetTemporalStock([FromRoute] string operation)
        {
            var response = await _service.GetTemporalStock(operation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{operation}")]
        public async Task<ActionResult> SetTemporalStock([FromRoute] string operation, [FromBody] TEMPORAL_STOCK_DTO lotDTO)
        {
            var response = await _service.SetTemporalStock(operation, lotDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("[action]/{operation}")]
        public async Task<ActionResult> DeleteTemporalStock([FromRoute] string operation, [FromQuery] string barcode)
        {
            var response = await _service.DeleteTemporalStock(operation, barcode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("[action]/{operation}")]
        public async Task<ActionResult> ClearTemporalStock([FromRoute] string operation)
        {
            var response = await _service.ClearTemporalStock(operation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 