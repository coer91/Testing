using HWMX.DotNet;

namespace Microservices.Interfaces
{
	public interface IPartnersService
	{
		Task<ResponseDTO<OptionDTO>> GetPartnerById(int partnerId);
		Task<ResponseList<OptionDTO>> GetPartnerList(); 
	}
}