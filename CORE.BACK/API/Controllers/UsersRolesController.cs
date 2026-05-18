using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/UsersRole")]
    public class UsersRolesController(UsersRolesIService service) : ControllerBase
    {


        [HttpGet]
        [Route("GetUsersRoleById/{userRoleId}")]
        public async Task<ActionResult> GetUsersRoleById([FromRoute] int userRoleId)
        {
            var response = await service.GetUserRoleById(userRoleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetUsersRoleList")]
        public async Task<ActionResult> GetUsersRoleList([FromQuery] int userId, bool onlyActive = true)
        {
            var response = await service.GetUserRoleList(userId, onlyActive);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("CreateUsersRole/{userId}/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateUsersRole([FromRoute] int userId, int roleId)
        {
            var response = await service.CreateUserRole(userId, roleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpPut]
        [Route("SetUserRoleMain/{userId}/{roleId}")]
        public async Task<ActionResult> SetMainUsersRole([FromRoute] int userId, string roleId)
        {
            var response = await service.SetUserRoleMain(userId, roleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("DeleteUsersRole/{userRoleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeleteUsersRole([FromRoute] int userRoleId)
        {
            var response = await service.DeleteUserRole(userRoleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }
    }
}