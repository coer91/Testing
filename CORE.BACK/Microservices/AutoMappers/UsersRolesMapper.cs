using Repositories.Database;
using Microservices.DTOs;
using AutoMapper;

namespace Microservices.AutoMappers
{
	public class UsersRolesMapper : Profile
	{
		public UsersRolesMapper()
		{
			CreateMap<TblUsersRole, UserRoleDTO>()
                .ForMember(dto => dto.User, src => src.MapFrom(entity => entity.User.User))
                .ForMember(dto => dto.Role, src => src.MapFrom(entity => entity.Role.Name));

            CreateMap<UserRoleDTO, TblUsersRole>()
                .ForMember(entity => entity.User, src => src.Ignore())
                .ForMember(entity => entity.Role, src => src.Ignore());
        }
	}
}