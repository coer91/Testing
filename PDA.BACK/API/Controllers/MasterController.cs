using Microservices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class MasterController(IMasterService _service) : ControllerBase
    { 

        [HttpGet]
        [Route("[action]/{lotNumber}")]
        public async Task<ActionResult> GetLotInformation([FromRoute] string lotNumber)
        {
            var response = await _service.GetLotInformation(lotNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        } 


        [HttpGet]
        [Route("[action]/{caseLabel}")]
        public async Task<ActionResult> GetLotListByCaseLabel([FromRoute] string caseLabel, [FromQuery] string storageCode = "")
        {
            var response = await _service.GetLotListByCaseLabel(caseLabel, storageCode);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[action]/{location}")]
        public async Task<ActionResult> GetLotListByLocation([FromRoute] string location)
        {
            var response = await _service.GetLotListByLocation(location);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]")]
        public async Task<ActionResult> GetStorageList([FromQuery] string factory = "", string storageType = "")
        {
            var response = await _service.GetStorageList(factory, storageType);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());
            
            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]/{location}")] 
        public async Task<ActionResult> GetLocation([FromRoute] string location)
        {
            var response = await _service.GetLocation(location);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]")]
        public async Task<ActionResult> GetLocationList([FromQuery] string rack, string rackType)
        {
            var response = await _service.GetLocationList(rack, rackType);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]/{partNumber}")]
        public async Task<ActionResult> GetLocationByMaterial([FromRoute] string partNumber)
        {
            var response = await _service.GetLocationByMaterial(partNumber);

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }


        [HttpGet]
        [Route("[Action]")]
        public async Task<ActionResult> GetPrinterList()
        {
            var response = await _service.GetPrinterList();

            if (response.Failure)
                return StatusCode(response.HttpCode, response.MessageList.FirstOrDefault());

            return Ok(response.Data);
        }
    }
} 