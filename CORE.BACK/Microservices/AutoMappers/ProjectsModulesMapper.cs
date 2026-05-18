using Microservices.DTOs;
using AutoMapper;
using Repositories.HWMXCore.Database;

namespace Microservices.AutoMappers
{
    public class ProjectsModulesMapper : Profile
    {
        public ProjectsModulesMapper()
        {
            CreateMap<TblProjectsModule, ProjectModuleDTO>()
                .ForMember(dto => dto.Project, src => src.MapFrom(x => x.Project != null ? x.Project.Name : null))
                .ForMember(dto => dto.MenuType, src => src.MapFrom(x => x.MenuType != null ? x.MenuType.Name : null))
                .ForMember(dto => dto.Pages, src => src.MapFrom(x => x.TblProjectsPages))
                .ForMember(dto => dto.Submodules, src => src.MapFrom(x => x.TblProjectsSubmodules));

            CreateMap<ProjectModuleDTO, TblProjectsModule>()
                .ForMember(entity => entity.MenuType, src => src.Ignore())
                .ForMember(entity => entity.Project, src => src.Ignore())
                .ForMember(entity => entity.TblProjectsPages, src => src.Ignore())
                .ForMember(entity => entity.TblProjectsSubmodules, src => src.Ignore());
        }
    }
}