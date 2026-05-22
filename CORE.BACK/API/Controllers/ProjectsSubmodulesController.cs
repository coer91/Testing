using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{
    [ApiController]
    [Route("api/ProjectsSubmodules")]
    public class ProjectsSubmodulesController(ProjectsSubmodulesIService _service) : ControllerBase
    {  

        [HttpGet]
        [Route("GetSubmoduleById/{submoduleId}")]
        public async Task<ActionResult> GetSubmoduleById([FromRoute] int submoduleId)
        {
            var response = await _service.GetSubmoduleById(submoduleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetSubmoduleList/{projectId}")]
        public async Task<ActionResult> GetSubmoduleList([FromRoute] int projectId, [FromQuery] int moduleId)
        {
            var response = await _service.GetSubmoduleList(projectId, moduleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("CreateSubmodule")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateSubmodule([FromBody] ProjectSubmoduleDTO submoduleDTO)
        {
            var response = await _service.CreateSubmodule(submoduleDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPut]
        [Route("UpdateSubmodule")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateSubmodule([FromBody] ProjectSubmoduleDTO submoduleDTO)
        {
            var response = await _service.UpdateSubmodule(submoduleDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPatch]
        [Route("PatchSubmodule/{submoduleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> PatchSubmodule([FromRoute] int submoduleId, [FromBody] JsonPatchDocument patch)
        {
            var response = await _service.PatchSubmodule(submoduleId, patch);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("DeleteSubmodule/{submoduleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeleteSubmodule([FromRoute] int submoduleId)
        {
            var response = await _service.DeleteSubmodule(submoduleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        } 
    }
} 