using AutoMapper;
using Microservices.DTOs;
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class ProjectsModulesMapper : Profile
    {
        public ProjectsModulesMapper()
        {
            CreateMap<TblProjectsModule, ProjectModuleDTO>()
                .ForMember(dto => dto.Name,        src => src.MapFrom(entity => entity.Translatory.English))
                .ForMember(dto => dto.Project,     src => src.MapFrom(entity => entity.Project.Name))
                .ForMember(dto => dto.MenuType,    src => src.MapFrom(entity => entity.MenuType.Name))
                .ForMember(dto => dto.Pages,       src => src.MapFrom(entity => entity.TblProjectsPages))
                .ForMember(dto => dto.Submodules,  src => src.MapFrom(entity => entity.TblProjectsSubmodules))
                .ForMember(dto => dto.Translatory, src => src.MapFrom(entity => entity.Translatory));

            CreateMap<ProjectModuleDTO, TblProjectsModule>()
                .ForMember(entity => entity.MenuType,              src => src.Ignore())
                .ForMember(entity => entity.Project,               src => src.Ignore())
                .ForMember(entity => entity.TblProjectsPages,      src => src.Ignore())
                .ForMember(entity => entity.TblProjectsSubmodules, src => src.Ignore())
                .ForMember(entity => entity.TranslatoryId,         src => src.MapFrom(dto => dto.Translatory.Id))
                .ForMember(entity => entity.Translatory,           src => src.MapFrom(dto => dto.Translatory));
        }
    }
}