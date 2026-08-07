using Microservices.Interfaces.Location; 
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Location
{
    [ApiController]
    [Route("api/Location/[controller]")]
    [ApiExplorerSettings(GroupName = "Location")] 

    public class IndicateLocationController(IIndicateLocationService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{caseLabel}")]
        public async Task<ActionResult> GetLotListByCaseLabel([FromRoute] string caseLabel)
        {
            var response = await _service.GetLotListByCaseLabel(caseLabel);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpGet]
        [Route("[action]/{location}")]
        public async Task<ActionResult> GetMaterialByLocation([FromRoute] string location)
        {
            var response = await _service.GetMaterialByLocation(location);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPut]
        [Route("[action]/{storageCode}/{location}")]
        public async Task<ActionResult> SetLotsInLocation([FromRoute] string storageCode, string location, [FromBody] string[] lotNumberList)
        {
            var response = await _service.SetLotsInLocation(storageCode, location, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault()); 

            return Ok(response.Data);
        }


        [HttpPut]
        [Route("[action]/{location}")]
        public async Task<ActionResult> SetInventoryCell([FromRoute] string location, [FromBody] string[] lotLocationList)
        {
            var response = await _service.SetInventoryCell(location, lotLocationList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}