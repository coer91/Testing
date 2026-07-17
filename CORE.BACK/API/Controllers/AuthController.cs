using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Auth")]
    public class AuthController(IAuthService _service) : ControllerBase
    {

        [HttpPost]
        [Route("GetContext")]
        [AllowAnonymous]
        public async Task<ActionResult> GetContext() => Ok(_service.GetContext()); 


        [HttpPost]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginDTO logIn)
        {
            var response = await _service.Login(logIn);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPut]
        [Route("SetLanguage/{languageId}")]
        public async Task<ActionResult> SetLanguage([FromRoute] string languageId)
        {
            var response = await _service.SetLanguage(languageId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPut]
        [Route("UpdateJWT")]
        public async Task<ActionResult> UpdateJWT()
        {
            var response = await _service.UpdateJWT();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}