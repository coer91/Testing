using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/Users")]
	public class UsersController(IUsersService _service) : ControllerBase
	{

		[HttpGet]
		[Route("[action]/{user}")]
		public async Task<ActionResult> GetUser([FromRoute] string user)
		{
			var response = await _service.GetUser(user);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpGet]
		[Route("[action]")]
		public async Task<ActionResult> GetUserList([FromQuery] string department = "", bool onlyActive = true)
		{
			var response = await _service.GetUserList(department, onlyActive);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


        [HttpPost]
        [Route("[action]/{user}")] 
        public async Task<ActionResult> CreateUser([FromRoute] string user)
        {
            var response = await _service.CreateUser(user);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201,response.Data);
        }


        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateUser([FromBody] UserDTO userDTO)
        {
            var response = await _service.UpdateUser(userDTO);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPatch]
		[Route("[action]/{user}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> PatchUser([FromRoute] string user, [FromBody] JsonPatchDocument patch)
		{
			var response = await _service.PatchUser(user, patch);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		} 
	}
}