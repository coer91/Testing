using Microservices.DTOs;
using Microservices.Interfaces.Store;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Store
{
    [ApiController]
    [Route("api/Store/[controller]")]
    [ApiExplorerSettings(GroupName = "Store")]
    public class GkdEntryController(IGkdEntryService _service) : ControllerBase
    {

        [HttpGet]
        [Route("[action]/{lotNumber}")]
        public async Task<ActionResult> GetKDLotInfo([FromRoute] string lotNumber)
        {
            var response = await _service.GetKDLotInfo(lotNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
         

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> SetKdStockIn([FromBody] List<LotInformationAoneDTO> lotList)
        { 
            var response = await _service.SetKdStockIn(lotList);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("[action]/{vbelg}")]
        public async Task<ActionResult> SetKdStockAoneIn([FromRoute] string vbelg)
        { 
            var response = await _service.SetKdStockAoneIn(vbelg);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 