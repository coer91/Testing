using Repositories.Database;
using Microservices.DTOs;
using AutoMapper;

namespace Microservices.AutoMappers
{
	public class UsersImageMapper : Profile
	{
		public UsersImageMapper()
		{
			CreateMap<TblUsersImage, UsersImageDTO>();
			CreateMap<UsersImageDTO, TblUsersImage>();
		}
	}
}