using Repositories.HWMXCore.Database;
using Microservices.DTOs;
using AutoMapper;
using HWMX.DotNet;

namespace Microservices.AutoMappers
{
	public class UserMapper : Profile
	{
		public UserMapper()
		{
			CreateMap<TblUser, UserDTO>()
				.ForMember(dto => dto.FullName, src => src.MapFrom(entity => string.Empty))
                .ForMember(dto => dto.Partner, src => src.Ignore())
                .ForMember(dto => dto.Role, src => src.Ignore())
                .AfterMap<UserAction>();

			CreateMap<UserDTO, TblUser>()
				.ForMember(entity => entity.Partner, src => src.Ignore())
				.ForMember(entity => entity.TblUsersImages, src => src.Ignore())
				.ForMember(entity => entity.TblUsersPassword, src => src.Ignore())
				.ForMember(entity => entity.TblUsersRoles, src => src.Ignore());
		}


		private class UserAction(IMapper _mapper) : IMappingAction<TblUser, UserDTO> 
		{
			public void Process(TblUser source, UserDTO destination, ResolutionContext context) 
			{
				if (source.Partner is not null)  
                    destination.Partner = _mapper.Map<OptionDTO>(source.Partner); 
			} 
		}
	}
}