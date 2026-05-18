using Repositories.HWMXCore.Database;
using Microservices.DTOs;
using AutoMapper;

namespace Microservices.AutoMappers
{
	public class ProjectsPagesLoginMapper : Profile
	{
		public ProjectsPagesLoginMapper()
		{
			CreateMap<TblProjectsPagesLogin, ProjectsPagesMesDTO>();

			CreateMap<ProjectsPagesMesDTO, TblProjectsPagesLogin>();
		} 
	}
}