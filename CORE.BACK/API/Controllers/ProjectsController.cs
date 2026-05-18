using Microservices.Interfaces;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{
    [ApiController]
    [Route("api/Projects")]
    public class ProjectsController(ProjectsIService _service) : ControllerBase
    {

        [HttpGet]
        [Route("GetMenuTypeList")]
        public async Task<ActionResult> GetMenuTypeList()
        {
            var response = await _service.GetMenuTypeList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetProjectList")]
        public async Task<ActionResult> GetProjectList()
        {
            var response = await _service.GetProjectList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 