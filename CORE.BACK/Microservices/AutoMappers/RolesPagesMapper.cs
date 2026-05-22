using Repositories.HWMXCore.Database;
using Microservices.DTOs;
using AutoMapper; 

namespace Microservices.AutoMappers
{
	public class RolesPagesMapper : Profile
	{
		public RolesPagesMapper()
		{
			CreateMap<TblRolesPage, RolePageDTO>()
				.ForMember(dto => dto.Page, src => src.MapFrom(x => string.Empty))
                .ForMember(dto => dto.Role, src => src.MapFrom(x => string.Empty))
                .ForMember(dto => dto.Path, src => src.MapFrom(x => string.Empty))
                .AfterMap<RolesPagesAction>();

			CreateMap<RolePageDTO, TblRolesPage>()
				.ForMember(entity => entity.Page, src => src.Ignore())
				.ForMember(entity => entity.Role, src => src.Ignore());

            CreateMap<TblProjectsPage, TblRolesPage>()
                .ForMember(entity => entity.Id,        src => src.Ignore())
                .ForMember(entity => entity.RoleId,    src => src.Ignore())
                .ForMember(entity => entity.PageId,    src => src.MapFrom(entity => entity.Id))
                .ForMember(entity => entity.CanCreate, src => src.MapFrom(entity => false))
                .ForMember(entity => entity.CanUpdate, src => src.MapFrom(entity => false))
                .ForMember(entity => entity.CanDelete, src => src.MapFrom(entity => false))
                .ForMember(entity => entity.Page,      src => src.MapFrom(entity => entity))
                .ForMember(entity => entity.Role,      src => src.Ignore());
        }


		private class RolesPagesAction : 
            IMappingAction<TblRolesPage, RolePageDTO>
		{
			public void Process(TblRolesPage source, RolePageDTO destination, ResolutionContext context) 
			{
                if (source.Role is not null)
                    destination.Role = source.Role.Name;
                                 
                if (source.Page is not null)
                {
                    destination.Page = source.Page.Name; 

                    if (source.Page.Project is not null)
                    {
                        destination.ProjectId = source.Page.ProjectId;
                        destination.Project = source.Page.Project.Name;
                    }

                    if (source.Page.Module is not null)
                    {
                        destination.ModuleId = source.Page.ModuleId;
                        destination.Module = source.Page.Module.Name; 
                    }

                    if (source.Page.Submodule is not null)
                    {
                        destination.SubmoduleId = source.Page.SubmoduleId;
                        destination.Submodule = source.Page.Submodule.Name; 
                    } 
                }
            }
		}
	}
}