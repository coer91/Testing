using Microservices.Interfaces.Lot;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Lot
{
    [ApiController]
    [Route("api/Lot/[controller]")]
    [ApiExplorerSettings(GroupName = "Lot")]
    public class InventoryInspectionController(IInventoryInspectionService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[Action]/{storageCode}")]
        public async Task<ActionResult> GetInspectionNumberList([FromRoute] string storageCode, [FromQuery] int range = 15)
        {
            var response = await _service.GetInspectionNumberList(storageCode, range);
            
            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());
            
            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[Action]/{storageCode}")]
        public async Task<ActionResult> CreateInspectionNumber([FromRoute] string storageCode)
        {
            var response = await _service.CreateInspectionNumber(storageCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPost]
        [Route("[Action]/{lotNumber}/{storageCode}")]
        public async Task<ActionResult> MoveLot([FromRoute] string lotNumber, string storageCode)
        {
            var response = await _service.MoveLot(lotNumber, storageCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[Action]/{storageCode}/{inspection}")]
        public async Task<ActionResult> SetInspectionLot([FromRoute] string storageCode, string inspection, [FromBody] string[] lotList)
        {
            var response = await _service.SetInspectionLot(storageCode, inspection, lotList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}
