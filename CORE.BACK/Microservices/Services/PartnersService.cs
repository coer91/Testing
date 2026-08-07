using Repositories.Interfaces;
using Repositories.Database;
using Microservices.Interfaces;
using Microservices.DTOs;
using AutoMapper;
using HWMX.DotNet;

namespace Microservices.Services
{
	public class PartnersService(IPartnersRepository _repository,	IMapper _mapper) : IPartnersService {

		public async Task<ResponseDTO<OptionDTO>> GetPartnerById(int partnerId)
		{
			ResponseDTO<OptionDTO> response = new();

			try
			{
				TblPartner entity = await _repository.GetPartnerBy(x => x.Id == partnerId);

				if (entity is null)
					return response.NotFound();

				//Response
				response.Data = _mapper.Map<OptionDTO>(entity);
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseList<OptionDTO>> GetPartnerList()
		{
			ResponseList<OptionDTO> response = new();

			try
			{
				List<TblPartner> entities = await _repository.GetPartnerList(x => true);
				List<OptionDTO> dtoList = _mapper.Map<List<OptionDTO>>(entities);

				//Response
				response.Data = dtoList;
			}

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		} 
	}
}