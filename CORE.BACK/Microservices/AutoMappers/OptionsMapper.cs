using AutoMapper;
using HWMX.DotNet;
using Repositories.HWMENMES.Database;
using Repositories.HWMXCore.Database;

namespace Microservices.AutoMappers
{
    public class OptionsMapper : Profile
    {
        public OptionsMapper()
        {
            CreateMap<TblProject, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => true))
                .ForMember(dto => dto.About, src => src.MapFrom(x => string.Empty));


            CreateMap<TblProjectsMenuType, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => true))
                .ForMember(dto => dto.About, src => src.MapFrom(x => string.Empty));


            CreateMap<TblRole, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => x.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(x => x.About))
                .ReverseMap();


            CreateMap<TblPartner, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => x.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(x => string.Empty))
                .ReverseMap();

            CreateMap<TblUsersRole, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(x => x.Role.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(x => x.Role.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => x.Role.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(x => x.Role.About))
                .ReverseMap();

            CreateMap<TblRolesPage, OptionDTO>()
                .ForMember(dto => dto.Id, src => src.MapFrom(x => x.Role.Id))
                .ForMember(dto => dto.Name, src => src.MapFrom(x => x.Role.Name))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => x.Role.IsActive))
                .ForMember(dto => dto.About, src => src.MapFrom(x => x.Role.About))
                .ReverseMap();

            CreateMap<ESAAURP, OptionDTO>()
               .ForMember(dto => dto.Id, src => src.MapFrom(x => 0))
               .ForMember(dto => dto.Name, src => src.MapFrom(x => x.ROLE_CD))
               .ForMember(dto => dto.IsActive, src => src.MapFrom(x => true))
               .ForMember(dto => dto.About, src => src.MapFrom(x => string.Empty))
               .ReverseMap();
        }
    }
}