using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController] 
    [Route("api/UsersImage")]
	public class UsersImageController(IUsersImageService _service) : ControllerBase
	{

		[HttpGet]
		[Route("[action]/{user}")]
		public async Task<ActionResult> GetUserImage([FromRoute] string user)
		{
			var response = await _service.GetUserImage(user);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data.Base64);
		} 


		[HttpPost]
		[Route("[action]/{user}")]
        [Authorize(Roles = "Developer,IT Administrator")]
        public async Task<ActionResult> UploadUserImage([FromRoute] string user, [FromForm] IFormFileCollection fileCollection)
		{
			var response = await _service.UploadUserImage(user, fileCollection);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data.Base64);
		}


        [HttpDelete]
        [Route("[action]/{user}")]
        [Authorize(Roles = "Developer,IT Administrator")]
        public async Task<ActionResult> DeleteUserImage([FromRoute] string user)
        {
            var response = await _service.DeleteUserImage(user);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}