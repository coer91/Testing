using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{
    [ApiController]
    [Route("api/ProjectsPages")]
    public class ProjectsPagesController(IProjectsPagesService _service) : ControllerBase
    { 

        [HttpGet]
        [Route("GetPageById/{pageId}")]
        public async Task<ActionResult> GetPageById([FromRoute] int pageId)
        {
            var response = await _service.GetPageById(pageId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetPageList/{projectId}")]
        public async Task<ActionResult> GetPageList([FromRoute] int projectId, [FromQuery] int moduleId, int submoduleId, bool onlyActive = true)
        {
            var response = await _service.GetPageList(projectId, moduleId, submoduleId, onlyActive);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("CreatePage")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreatePage([FromBody] ProjectPageDTO pageDTO)
        {
            var response = await _service.CreatePage(pageDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPut]
        [Route("UpdatePage")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdatePage([FromBody] ProjectPageDTO pageDTO)
        {
            var response = await _service.UpdatePage(pageDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPatch]
        [Route("PatchPage/{pageId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> PatchPage([FromRoute] int pageId, [FromBody] JsonPatchDocument patch)
        {
            var response = await _service.PatchPage(pageId, patch);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("DeletePage/{pageId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeletePage([FromRoute] int pageId)
        {
            var response = await _service.DeletePage(pageId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        } 
    }
} 