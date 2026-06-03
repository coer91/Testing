using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersRolesController(IUsersRolesService service) : ControllerBase
    {


        [HttpGet]
        [Route("[action]/{userRoleId}")]
        public async Task<ActionResult> GetUsersRoleById([FromRoute] int userRoleId)
        {
            var response = await service.GetUserRoleById(userRoleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetUsersRoleList([FromQuery] int userId, bool onlyActive = true)
        {
            var response = await service.GetUserRoleList(userId, onlyActive);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{userId}/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateUserRole([FromRoute] int userId, int roleId)
        {
            var response = await service.CreateUserRole(userId, roleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPost]
        [Route("[action]/{userId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateUserRoleList([FromRoute] int userId, [FromBody] int[] roleList)
        {
            var response = await service.CreateUserRoleList(userId, roleList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPut]
        [Route("[action]/{userId}/{roleId}")]
        public async Task<ActionResult> SetUserRoleMain([FromRoute] int userId, string roleId)
        {
            var response = await service.SetUserRoleMain(userId, roleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("[action]/{userId}/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeleteUserRole([FromRoute] int userId, int roleId)
        {
            var response = await service.DeleteUserRole(userId, roleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }
    }
}