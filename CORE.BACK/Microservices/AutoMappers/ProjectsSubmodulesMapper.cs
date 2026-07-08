using Repositories.Database;
using Microservices.DTOs;
using AutoMapper;

namespace Microservices.AutoMappers
{
	public class ProjectsSubmodulesMapper : Profile
	{
		public ProjectsSubmodulesMapper()
		{
            CreateMap<TblProjectsSubmodule, ProjectSubmoduleDTO>()
                .ForMember(dto => dto.ProjectId, src => src.MapFrom(x => x.Module   != null ? x.Module.Project.Id : 0))
                .ForMember(dto => dto.Project,   src => src.MapFrom(x => x.Module   != null ? x.Module.Project.Name : null))
                //.ForMember(dto => dto.Module,    src => src.MapFrom(x => x.Module   != null ? x.Module.Name : null))
                .ForMember(dto => dto.MenuType,  src => src.MapFrom(x => x.MenuType != null ? x.MenuType.Name : null))
                .ForMember(dto => dto.Pages,     src => src.MapFrom(x => x.TblProjectsPages));

			CreateMap<ProjectSubmoduleDTO, TblProjectsSubmodule>()
				.ForMember(entity => entity.MenuType, src => src.Ignore()) 
                .ForMember(entity => entity.Module, src => src.Ignore())
                .ForMember(entity => entity.TblProjectsPages, src => src.Ignore());
        }
	}
}