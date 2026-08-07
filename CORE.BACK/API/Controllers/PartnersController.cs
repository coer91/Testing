using Microsoft.AspNetCore.Mvc;
using Microservices.Interfaces; 

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PartnersController(IPartnersService _service) : ControllerBase
	{

		[HttpGet]
		[Route("[action]/{partnerId}")]
		public async Task<ActionResult> GetPartnerById([FromRoute] int partnerId)
		{
			var response = await _service.GetPartnerById(partnerId);

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		}


		[HttpGet]
		[Route("[action]")]
		public async Task<ActionResult> GetPartnerList()
		{
			var response = await _service.GetPartnerList();

			if (response.Failure)
				return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

			return Ok(response.Data);
		} 
	}
}