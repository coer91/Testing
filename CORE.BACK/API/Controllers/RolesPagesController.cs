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
        [Route("GetRolePageList/{projectId}/{roleId}")]
        public async Task<ActionResult> GetRolePageList([FromRoute] int projectId, int roleId, [FromQuery] bool onlyActive = true)
        { 
            var response = await _service.GetRolePageList(projectId, roleId, onlyActive);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("CreateRolePageList/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateRolePage([FromRoute] int roleId, [FromBody] List<int> pageIdList)
        {
            var response = await _service.CreateRolePage(roleId, pageIdList);

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