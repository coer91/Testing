using Microservices.Interfaces;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{
    [ApiController]
    [Route("api/Master")]
    public class MasterController(IMasterService _service) : ControllerBase
    {
        [HttpGet]
        [Route("GetRackLocationList")]
        public async Task<ActionResult> GetRackLocationList()
        {
            var response = await _service.GetRackLocationList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("GetRackLocInfo/{locNo}")]
        public async Task<ActionResult> GetRackLocInfo([FromRoute] string locNo, [FromQuery] string rackType1 = "")
        {
            var response = await _service.GetRackLocInfo(locNo, rackType1);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("[Action]/{partNo}")]
        public async Task<ActionResult> GetRackLocationPartNoList([FromRoute] string partNo)
        {
            var response = await _service.GetRackLocationPartNoList(partNo);
            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());
            return Ok(response.Data);
        } 
    }
} 