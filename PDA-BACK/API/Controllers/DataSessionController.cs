using Microservices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataSessionController(IDataSessionService _service) : ControllerBase
    {
        [HttpGet]
        [Route("[Action]/{pageCode}/{operation}")]
        public async Task<ActionResult> GetDataSession([FromRoute] string pageCode, string operation)
        {
            var response = await _service.GetDataSession(pageCode, operation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]/{pageCode}")]
        public async Task<ActionResult> GetLastDataSession([FromRoute] string pageCode)
        {
            var response = await _service.GetLastDataSession(pageCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]/{pageCode}/{detail}")]
        public async Task<ActionResult> GetDetailDataSession([FromRoute] string pageCode, string detail)
        {
            var response = await _service.GetDetailDataSession(pageCode, detail);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]/{pageCode}/{detail}")]
        public async Task<ActionResult> GetStatusDataSession([FromRoute] string pageCode, string detail)
        {
            var response = await _service.GetStatusDataSession(pageCode, detail);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[Action]/{pageCode}/{operation}/{detail}")]
        public async Task<ActionResult> AddDataSession([FromRoute] string pageCode, string operation, string detail, [FromBody] string json)
        {
            var response = await _service.AddDataSession(pageCode, operation, detail, json);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[Action]/{pageCode}/{operation}")]  
        public async Task<ActionResult> SetDataSession([FromRoute] string pageCode, string operation, [FromBody] string[][] detail)
        {
            var response = await _service.SetDataSession(pageCode, operation, detail);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return StatusCode(201, response.Data);
        }


        [HttpDelete]
        [Route("[Action]/{pageCode}/{operation}/{detail}")]
        public async Task<ActionResult> DeleteDataSession([FromRoute] string pageCode, string operation, string detail)
        {
            var response = await _service.DeleteDataSession(pageCode, operation, detail);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpDelete]
        [Route("[Action]/{pageCode}/{operation}")]
        public async Task<ActionResult> ClearDataSession([FromRoute] string pageCode, string operation)
        {
            var response = await _service.ClearDataSession(pageCode, operation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
}