using Microservices.Interfaces;
using Repositories.Interfaces;
using Repositories.Database; 
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services
{
    public class MasterService(IMasterRepository _repository) : IMasterService
    {

        public async Task<ResponseDTO<LOT_INFORMATION_DTO>> GetLotInformation(string lotNumber)
        {
            ResponseDTO<LOT_INFORMATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotInformation(lotNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_INFORMATION_DTO>().FirstOrDefault();

                if (response.Data is null)
                    return response.NotFound(); 
             }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseList<LOT_INFORMATION_DTO>> GetLotListByCaseLabel(string caseLabel, string storageCode = "")
        {
            ResponseList<LOT_INFORMATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotListByCaseLabel(caseLabel, storageCode);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_INFORMATION_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<LOT_INFORMATION_DTO>> GetLotListByLocation(string location)
        {
            ResponseList<LOT_INFORMATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLotListByLocation(location);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<LOT_INFORMATION_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<STORAGE_DTO>> GetStorageList(string factory = "", string storageType = "")
        {
            ResponseList<STORAGE_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetStorageList(factory, storageType);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<STORAGE_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<RACK_LOCATION_DTO>> GetLocation(string location)
        {
            ResponseDTO<RACK_LOCATION_DTO> response = new();

            try
            {                
                ResponseProcedure responseProcedure = await _repository.GetLocation(location, null, null);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<RACK_LOCATION_DTO>().FirstOrDefault();

                if (response.Data is null)
                    return response.NotFound(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<RACK_LOCATION_DTO>> GetLocationList(string rack, string rackType)
        {
            ResponseList<RACK_LOCATION_DTO> response = new();

            try
            {                
                ResponseProcedure responseProcedure = await _repository.GetLocation(null, rack, rackType);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<RACK_LOCATION_DTO>();  
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<RACK_LOCATION_DTO>> GetLocationByMaterial(string partNumber)
        {
            ResponseList<RACK_LOCATION_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetLocationByMaterial(partNumber);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<RACK_LOCATION_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<PRINTER_DTO>> GetPrinterList()
        {
            ResponseList<PRINTER_DTO> response = new();

            try
            {
                ResponseProcedure responseProcedure = await _repository.GetPrinterList(null);

                if (responseProcedure.Failure)
                    return response.Error(responseProcedure.MessageList);

                response.Data = responseProcedure.GetTable<PRINTER_DTO>(); 
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 