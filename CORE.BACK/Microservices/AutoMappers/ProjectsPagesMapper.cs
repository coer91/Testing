using Repositories.HWMXCore.Database;
using Microservices.DTOs;
using AutoMapper;

namespace Microservices.AutoMappers
{ 
    public class ProjectsPagesMapper : Profile
    {
        public ProjectsPagesMapper()
        {
            CreateMap<TblProjectsPage, ProjectPageDTO>()
                .ForMember(dto => dto.Project, src => src.MapFrom(x => x.Project != null ? x.Project.Name : null))
                .ForMember(dto => dto.Module, src => src.MapFrom(x => x.Module != null ? x.Module.Name : null))
                .ForMember(dto => dto.Submodule, src => src.MapFrom(x => x.Submodule != null ? x.Submodule.Name : null));

            CreateMap<ProjectPageDTO, TblProjectsPage>()
                .ForMember(entity => entity.Module, src => src.Ignore())
                .ForMember(entity => entity.Project, src => src.Ignore())
                .ForMember(entity => entity.Submodule, src => src.Ignore())
                .ForMember(entity => entity.TblRolesPages, src => src.Ignore());
        }
    }
}