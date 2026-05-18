using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;

namespace Microservices.Services
{
    public class MasterService(IMES_RACK_LOC_Repository _repository, IMapper _mapper) : IMasterService
    {
        public async Task<ResponseList<RackLocationDTO>> GetRackLocationList()
        {
            ResponseList<RackLocationDTO> response = new();

            try
            {
                List<MES_RACK_LOC_MA> entities = await _repository.GetRackLocationList(x => true);
                List<RackLocationDTO> rackLocationList = _mapper.Map<List<RackLocationDTO>>(entities);

                //Response
                response.Data = [.. rackLocationList.OrderBy(x => x.AddrCall).ThenBy(x => x.BitPos)]; 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 