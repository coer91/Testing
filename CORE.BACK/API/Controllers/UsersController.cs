using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microservices.Interfaces;
using Microservices.DTOs;

namespace API.Controllers
{
	[ApiController]
	[Route("api/Users")]
	public class UsersController(IUsersService _service) : ControllerBase
	{

		[HttpGet]
		[Route("GetUser/{user}")]
		public async Task<ActionResult> GetUser([FromRoute] string user)
		{
			var response = await _service.GetUser(user);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpGet]
		[Route("GetUserList")]
		public async Task<ActionResult> GetUserList([FromQuery] string department = "", bool onlyActive = true)
		{
			var response = await _service.GetUserList(department, onlyActive);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}  


		[HttpPatch]
		[Route("PatchUser/{user}")]
		public async Task<ActionResult> PatchUser([FromRoute] string user, [FromBody] JsonPatchDocument patch)
		{
			var response = await _service.PatchUser(user, patch);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		} 
	}
}