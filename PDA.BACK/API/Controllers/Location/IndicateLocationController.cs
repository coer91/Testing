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
        public async Task<ActionResult> GetCaseLabelLocation([FromRoute] string caseLabel)
        {
            var response = await _service.GetCaseLabelLocation(caseLabel);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        //[HttpGet]
        //[Route("[action]/{location}/{partNumber}")]
        //public async Task<ActionResult> PartNumberLocationMatching([FromRoute] string location, string partNumber)
        //{
        //    var response = await _service.PartNumberLocationMatching(location, partNumber);

        //    if (response.Failure)
        //        return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault()); 

        //    return Ok(response.Data);
        //}


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
    }
}