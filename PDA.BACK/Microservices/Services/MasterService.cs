using AutoMapper;
using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces;
using Repositories.Database;
using Repositories.Interfaces;

namespace Microservices.Services
{
    public class MasterService(IMasterRepository _repository, IMapper _mapper) : IMasterService
    {

        public async Task<ResponseDTO<LotInformationDTO>> GetLotInformation(string lotNumber)
        {
            ResponseDTO<LotInformationDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotInformation(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var entity = responseProcedure.GetTable<LOT_INFORMATION>().FirstOrDefault();

                if (entity is null)
                    return response.NotFound();

                response.Data = _mapper.Map<LotInformationDTO>(entity); 
             }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseList<LotInformationDTO>> GetLotListByCaseLabel(string caseLabel, string storageCode = "")
        {
            ResponseList<LotInformationDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotListByCaseLabel(caseLabel, storageCode);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var entities = responseProcedure.GetTable<LOT_INFORMATION>();

                response.Data = _mapper.Map<List<LotInformationDTO>>(entities);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<LotInformationDTO>> GetLotListByLocation(string location)
        {
            ResponseList<LotInformationDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotListByLocation(location);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var entities = responseProcedure.GetTable<LOT_INFORMATION>();

                response.Data = _mapper.Map<List<LotInformationDTO>>(entities);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<StorageDTO>> GetStorageList(string factory = "", string storageType = "")
        {
            ResponseList<StorageDTO> response = new();

            try
            {
                string _factory = factory.Contains(',') ? string.Empty : factory.ToUpper();
                string _storageType = storageType.Contains(',') ? string.Empty : storageType.ToUpper();
                ResponseProcedure responseProcedure = await _repository.GetStorageList(_factory, _storageType);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);


                var entities = responseProcedure.GetTable<STORAGE>();
                response.Data = _mapper.Map<List<StorageDTO>>(entities); 

                //Extra Filters
                if (factory.Contains(','))
                {
                    string[] factoryList = [.. factory.Split(',').Select(x => x.Trim().ToUpper())];
                    response.Data = [.. response.Data.Where(x => factoryList.Contains(x.Factory.ToUpper()))];
                }

                if (storageType.Contains(','))
                {
                    string[] storageTypeList = [.. storageType.Split(',').Select(x => x.Trim().ToUpper())];
                    response.Data = [.. response.Data.Where(x => storageTypeList.Contains(x.Type.ToUpper()))]; 
                }
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<RackLocationDTO>> GetLocation(string location)
        {
            ResponseDTO<RackLocationDTO> response = new();

            try
            {                
                ResponseProcedure responseProcedure = await _repository.GetLocation(location, null, null);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var entity = responseProcedure.GetTable<RACK_LOCATION>().FirstOrDefault();

                if (entity is null)
                    return response.NotFound();

                response.Data = _mapper.Map<RackLocationDTO>(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<RackLocationDTO>> GetLocationList(string rack, string rackType)
        {
            ResponseList<RackLocationDTO> response = new();

            try
            {                
                ResponseProcedure responseProcedure = await _repository.GetLocation(null, rack, rackType);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var entities = responseProcedure.GetTable<RACK_LOCATION>(); 

                response.Data = _mapper.Map<List<RackLocationDTO>>(entities);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseList<RackLocationDTO>> GetLocationByMaterial(string partNumber)
        {
            ResponseList<RackLocationDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLocationByMaterial(partNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = [..
                    responseProcedure.GetTable<dynamic>().Select(x => new RackLocationDTO
                    {
                        Location = x.LOC_NO,
                        Rack     = x.RACK_NO,
                        RackType = x.RACK_TYPE,
                        Row      = (int)(x?.ROW_NO ?? 0),
                        Column   = (int)(x?.COL_NO ?? 0),
                    }).OrderBy(x => x.Rack).ThenBy(x => x.Row).ThenBy(x => x.Column)
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<OptionDTO>> GetPrinterList()
        {
            ResponseList<OptionDTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetPrinterList(null);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                var entity = responseProcedure.GetTable<PRINTER>();
                response.Data = _mapper.Map<List<OptionDTO>>(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 