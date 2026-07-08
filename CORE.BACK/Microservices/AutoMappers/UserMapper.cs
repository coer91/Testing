using AutoMapper; 
using Microservices.DTOs;
using Repositories.Database;

namespace Microservices.AutoMappers
{
	public class UserMapper : Profile
	{
		public UserMapper()
		{
			CreateMap<UserOracleDTO, UserDTO>()
				.ForMember(dto => dto.Id,           src => src.Ignore())
				.ForMember(dto => dto.User,         src => src.MapFrom(entity => entity.USER))
                .ForMember(dto => dto.FullName,     src => src.MapFrom(entity => entity.FULL_NAME))
                .ForMember(dto => dto.Email,        src => src.MapFrom(entity => entity.EMAIL))
                .ForMember(dto => dto.Factory,      src => src.MapFrom(entity => entity.FACTORY))
                .ForMember(dto => dto.DepartmentId, src => src.MapFrom(entity => entity.DEPARTMENT_CODE))
                .ForMember(dto => dto.Department,   src => src.MapFrom(entity => entity.DEPARTMENT))
                .ForMember(dto => dto.PartnerId,    src => src.Ignore())
                .ForMember(dto => dto.Partner,      src => src.Ignore())
                .ForMember(dto => dto.Language,     src => src.Ignore())
                .ForMember(dto => dto.IsActive,     src => src.MapFrom(entity => entity.USE_YN.Equals("Y")))
                .ForMember(dto => dto.Roles,        src => src.Ignore())
				.ReverseMap();

            CreateMap<TblUser, UserDTO>()
                .ForMember(dto => dto.Id,           src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.User,         src => src.MapFrom(entity => entity.User))
                .ForMember(dto => dto.FullName,     src => src.Ignore())
                .ForMember(dto => dto.Email,        src => src.Ignore())
                .ForMember(dto => dto.DepartmentId, src => src.Ignore())
                .ForMember(dto => dto.Department,   src => src.Ignore())
                .ForMember(dto => dto.Factory,      src => src.Ignore())
                .ForMember(dto => dto.PartnerId,    src => src.MapFrom(entity => entity.Partner != null ? entity.Partner.Id : 0))
                .ForMember(dto => dto.Partner,      src => src.MapFrom(entity => entity.Partner != null ? entity.Partner.Name : string.Empty))
                .ForMember(dto => dto.IsActive,     src => src.MapFrom(entity => true))
                .ForMember(dto => dto.Roles,        src => src.MapFrom(entity => entity.TblUsersRoles));
		} 
	}
}