using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/RolesPages")]
    public class RolesPagesController(IRolesPagesSevice _service) : ControllerBase
    { 


        [HttpGet]
        [Route("[action]/{projectId}/{roleId}")]
        public async Task<ActionResult> GetRolePageListByRoleId([FromRoute] int projectId, int roleId, [FromQuery] bool onlyActive = true)
        { 
            var response = await _service.GetRolePageListByRoleId(projectId, roleId, onlyActive);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[action]/{pageId}")]
        public async Task<ActionResult> GetRolePageListByPageId([FromRoute] int pageId, [FromQuery] bool onlyActive = true)
        {
            var response = await _service.GetRolePageListByPageId(pageId, onlyActive);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("AddPageListByRole/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> AddPageListByRole([FromRoute] int roleId, [FromBody] List<int> pageIdList)
        {
            var response = await _service.AddPageListByRole(roleId, pageIdList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPost]
        [Route("AddRoleListByPage/{pageId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> AddRoleListByPage([FromRoute] int pageId, [FromBody] List<int> roleIdList)
        {
            var response = await _service.AddRoleListByPage(pageId, roleIdList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPatch]
        [Route("PatchRolePage/{rolePageId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> PatchRolePage([FromRoute] int rolePageId, [FromBody] JsonPatchDocument patch)
        {
            var response = await _service.PatchRolePage(rolePageId, patch);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("DeleteRolePage/{rolePageId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeleteRolePage([FromRoute] int rolePageId)
        {
            var response = await _service.DeleteRolePage(rolePageId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }
    }
}