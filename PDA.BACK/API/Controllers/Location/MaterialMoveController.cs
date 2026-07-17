using Microservices.Interfaces.Location; 
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Location
{
    [ApiController]
    [Route("api/Location/[controller]")]
    [ApiExplorerSettings(GroupName = "Location")]
    public class MaterialMoveController(IMaterialMoveService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{issueNumber}")]
        public async Task<ActionResult> GetMaterialByIssue([FromRoute] string issueNumber)
        {
            var response = await _service.GetMaterialByIssue(issueNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[action]/{lotNumber}")]
        public async Task<ActionResult> GetMaterialFIFO([FromRoute] string lotNumber)
        {
            var response = await _service.GetMaterialFIFO(lotNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpGet]
        [Route("[action]/{partNumber}/{lotNumber}")]
        public async Task<ActionResult> GetLotFIFO([FromRoute] string partNumber, string lotNumber)
        {
            var response = await _service.GetLotFIFO(partNumber, lotNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{issueNumber}")]
        public async Task<ActionResult> MoveMaterial([FromRoute] string issueNumber, [FromBody] string[] lotNumberList)
        {
            var response = await _service.MoveMaterial(issueNumber, lotNumberList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    } 
}