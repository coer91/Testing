using AutoMapper;
using HWMX.DotNet;
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class OptionsMapper : Profile
    {
        public OptionsMapper()
        {
            CreateMap<TblProject, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(entity => entity.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => true))
                .ForMember(dto => dto.About, src => src.MapFrom(entity => string.Empty));


            CreateMap<TblProjectsMenuType, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(entity => entity.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => true))
                .ForMember(dto => dto.About, src => src.MapFrom(entity => string.Empty));


            CreateMap<TblRole, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(entity => entity.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => entity.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(entity => entity.About))
                .ReverseMap();


            CreateMap<TblPartner, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(entity => entity.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => entity.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(entity => string.Empty))
                .ReverseMap();

            CreateMap<TblUsersRole, OptionDTO>()
                .ForMember(dto => dto.Id,       src => src.MapFrom(entity => entity.Role.Id))
                .ForMember(dto => dto.Name,     src => src.MapFrom(entity => entity.Role.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => entity.Role.IsActive))
                .ForMember(dto => dto.About,    src => src.MapFrom(entity => entity.Role.About))
                .ReverseMap();

            CreateMap<TblRolesPage, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(entity => entity.Role.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(entity => entity.Role.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => entity.Role.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(entity => entity.Role.About))
                .ReverseMap();

            CreateMap<TblPartner, OptionDTO>()
                .ForMember(dto => dto.Id,       src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.Name,     src => src.MapFrom(entity => entity.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => entity.IsActive))
                .ForMember(dto => dto.About,    src => src.MapFrom(entity => string.Empty))
                .ReverseMap();
        }
    }
}