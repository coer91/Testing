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
                .ForMember(dto => dto.Name,        src => src.MapFrom(entity => entity.Translatory.English))
                .ForMember(dto => dto.ProjectId,   src => src.MapFrom(entity => entity.Module.Project.Id))
                .ForMember(dto => dto.Project,     src => src.MapFrom(entity => entity.Module.Project.Name))
                .ForMember(dto => dto.Module,      src => src.MapFrom(entity => entity.Module.Translatory.English))
                .ForMember(dto => dto.MenuType,    src => src.MapFrom(entity => entity.MenuType.Name))
                .ForMember(dto => dto.Pages,       src => src.MapFrom(entity => entity.TblProjectsPages))
                .ForMember(dto => dto.Translatory, src => src.MapFrom(entity => entity.Translatory));

			CreateMap<ProjectSubmoduleDTO, TblProjectsSubmodule>()
				.ForMember(entity => entity.MenuType,         src => src.Ignore()) 
                .ForMember(entity => entity.Module,           src => src.Ignore())
                .ForMember(entity => entity.TblProjectsPages, src => src.Ignore())
                .ForMember(entity => entity.TranslatoryId,    src => src.MapFrom(dto => dto.Translatory.Id))
                .ForMember(entity => entity.Translatory,      src => src.MapFrom(dto => dto.Translatory));
        }
	}
}