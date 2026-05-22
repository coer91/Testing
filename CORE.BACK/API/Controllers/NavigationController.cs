using Microsoft.AspNetCore.Authorization;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microservices.DTOs;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Navigation")]
    public class NavigationController(INavigationService _service) : ControllerBase
    {


        [HttpGet]
        [Route("GetNavigation/{projectId}")]
        public async Task<ActionResult> GetNavigation([FromRoute] int projectId)
        {
            var response = await _service.GetNavigation(projectId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetNavigationByRole/{projectId}/{roleId}")]
        public async Task<ActionResult> GetNavigationByRole([FromRoute] int projectId, int roleId)
        {
            var response = await _service.GetNavigationByRole(projectId, roleId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("GetNavigationByProject/{projectId}")]
        public async Task<ActionResult> GetNavigationByProject([FromRoute] int projectId)
        {
            var response = await _service.GetNavigationByProject(projectId);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPut]
        [Route("UpdateLevel1/{projectId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateLevel1([FromRoute] int projectId, [FromBody] List<NavigationDTO> navigation)
        {
            var response = await _service.UpdateLevel1(projectId, navigation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }


        [HttpPut]
        [Route("UpdateLevel2/{projectId}/{moduleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateLevel2([FromRoute] int projectId, int moduleId, [FromBody] List<NavigationDTO> navigation)
        {
            var response = await _service.UpdateLevel2(projectId, moduleId, navigation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }


        [HttpPut]
        [Route("UpdateLevel3/{projectId}/{moduleId}/{submoduleId}")]
        [Authorize(Roles = "Developer")]
        public async Task<ActionResult> UpdateLevel3([FromRoute] int projectId, int moduleId, int submoduleId, [FromBody] List<NavigationDTO> navigation)
        {
            var response = await _service.UpdateLevel3(projectId, moduleId, submoduleId, navigation);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return NoContent();
        }
    }
}
