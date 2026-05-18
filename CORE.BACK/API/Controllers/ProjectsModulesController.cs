using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{
    [ApiController]
    [Route("api/ProjectsModules")]
    public class ProjectsModulesController(IProjectsModulesService _service) : ControllerBase
    {
        
        [HttpGet]
        [Route("GetModuleById/{moduleId}")]
        public async Task<ActionResult> GetModuleById([FromRoute] int moduleId)
        {
            var response = await _service.GetModuleById(moduleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetModuleList/{projectId}")]
        public async Task<ActionResult> GetModuleList([FromRoute] int projectId)
        {
            var response = await _service.GetModuleList(projectId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("CreateModule")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateModule([FromBody] ProjectModuleDTO moduleDTO)
        {
            var response = await _service.CreateModule(moduleDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPut]
        [Route("UpdateModule")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateModule([FromBody] ProjectModuleDTO moduleDTO)
        {
            var response = await _service.UpdateModule(moduleDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPatch]
        [Route("PatchModule/{moduleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> PatchModule([FromRoute] int moduleId, [FromBody] JsonPatchDocument patch)
        {
            var response = await _service.PatchModule(moduleId, patch);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("DeleteModule/{moduleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeleteModule([FromRoute] int moduleId)
        {
            var response = await _service.DeleteModule(moduleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }
    }
} 