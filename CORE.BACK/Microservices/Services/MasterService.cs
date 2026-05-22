using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;

namespace Microservices.Services
{
    public class MasterService(
        IMES_RACK_LOC_Repository _repository,
        IMES_RACK_LOC_PART_MA_Repository _partNoRepository,
        IMES_STORAGE_MA_Repository _storageRepository,
        IMapper _mapper
    ) : IMasterService
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

        public async Task<ResponseDTO<RackLocationDTO>> GetRackLocInfo(string locNo, string rackType1 = "")
        {
            ResponseDTO<RackLocationDTO> response = new();

            try
            {
                MES_RACK_LOC_MA entity = await _repository.GetRackLocationBy(x
                    => x.LOC_NO.Equals(locNo)
                    && (string.IsNullOrWhiteSpace(rackType1) || x.RACK_TYPE1.Equals(rackType1))
                );

                if (entity is null)
                {
                    return response.NotFound("Lote no encontrado.");
                }
                response.Data = _mapper.Map<RackLocationDTO>(entity);

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }


            return response;
        }

        public async Task<ResponseList<RackLocationPartNoDTO>> GetRackLocationPartNoList(string partNo)
        {
            ResponseList<RackLocationPartNoDTO> response = new();

            try
            {
                List<MES_RACK_LOC_PART_MA> entities = await _partNoRepository.GetRackLocationPartNoList(x => x.PART_NO.Equals(partNo));
                List<RackLocationPartNoDTO> rackLocationPartNoList = _mapper.Map<List<RackLocationPartNoDTO>>(entities);
                //Response
                response.Data = [.. rackLocationPartNoList.OrderBy(x => x.LocationNumber)];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response; 
        }


        public async Task<ResponseList<StorageDTO>> GetStorageList()
        {
            ResponseList<StorageDTO> response = new();

            try
            {
                List<MES_STORAGE_MA> entities = await _storageRepository.GetStorageList(x => true);
                List<StorageDTO> storageList = _mapper.Map<List<StorageDTO>>(entities);

                //Response
                response.Data = [.. storageList.OrderBy(x => x.Factory).ThenBy(x => x.Sequence)];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }

}