using Microsoft.CodeAnalysis;
using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Interfaces
{
	public interface IProjectsRepository
	{ 
        Task<List<TblProjectsMenuType>> GetMenuTypeList(Expression<Func<TblProjectsMenuType, bool>> expression);
        Task<TblProject> GetProjectBy(Expression<Func<TblProject, bool>> expression);
		Task<List<TblProject>> GetProjectList(Expression<Func<TblProject, bool>> expression);
        Task<List<TblRolesPage>> GetNavigationByUser(int projectId, int userId);
    }
}