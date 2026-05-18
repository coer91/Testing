using HWMX.DotNet;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/Roles")]
	public class RolesController(IRolesService _service) : ControllerBase
	{

		[HttpGet]
		[Route("GetRoleById/{roleId}")]
		public async Task<ActionResult> GetRoleById([FromRoute] int roleId)
		{
			var response = await _service.GetRoleById(roleId);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpGet]
		[Route("GetRoleList")]
		public async Task<ActionResult> GetRoleList([FromQuery] bool onlyActive = true)
		{
			var response = await _service.GetRoleList(onlyActive);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpPost]
		[Route("CreateRole")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> CreateRole([FromBody] OptionDTO roleDTO)
		{
			var response = await _service.CreateRole(roleDTO);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return StatusCode(201, response.Data);
		}


		[HttpPut]
		[Route("UpdateRole")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateRole([FromBody] OptionDTO roleDTO)
		{
			var response = await _service.UpdateRole(roleDTO);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpPatch]
		[Route("PatchRole/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> PatchRole([FromRoute] int roleId, [FromBody] JsonPatchDocument patch)
		{
			var response = await _service.PatchRole(roleId, patch);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpDelete]
		[Route("DeleteRole/{roleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> DeleteRole([FromRoute] int roleId)
		{
			var response = await _service.DeleteRole(roleId);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return NoContent();
		}
	}
}