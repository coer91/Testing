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
        [Route("Login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginDTO logIn)
        {
            var response = await _service.Login(logIn);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("LoginOracle")]
        [AllowAnonymous]
        public async Task<ActionResult> LoginOracle([FromBody] LoginDTO logIn)
        {
            var response = await _service.LoginOracle(logIn);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("RecoveryPasswordEmail/{user}")]
        [AllowAnonymous]
        public async Task<ActionResult> RecoveryPasswordEmail([FromRoute] string user, [FromQuery] int? offset)
        {
            var response = await _service.RecoveryPasswordEmail(user, offset);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("RecoveryPasswordSupport")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> RecoveryPasswordSupport([FromQuery] string user, [FromQuery] int? offset)
        {
            var response = await _service.RecoveryPasswordSupport(user, offset);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPut]
        [Route("SetPassword")]
        public async Task<ActionResult> SetPassword([FromBody] LoginDTO login)
        {
            var response = await _service.SetPassword(login.Password);

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