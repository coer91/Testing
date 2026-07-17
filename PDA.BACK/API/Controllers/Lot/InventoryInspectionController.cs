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
        [Route("[Action]")]
        public async Task<ActionResult> GetInspNumberList([FromQuery] string storageCode = "", int range = 15)
        {
            var response = await _service.GetInspNumberList(storageCode, range);
            
            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());
            
            return Ok(response.Data);
        }


        [HttpPut]
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
        public async Task<ActionResult> SetInspection([FromRoute] string storageCode, string inspection, [FromBody] string[] lotList)
        {
            var response = await _service.SetInspection(storageCode, inspection, lotList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}
