using Microsoft.CodeAnalysis;
using Repositories.HWMXCore.Database;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Interfaces
{
	public interface IProjectsRepository
	{ 
		Task<List<TblProject>> GetProjectList(Expression<Func<TblProject, bool>> expression);

        Task<List<TblProjectsMenuType>> GetMenuTypeList(Expression<Func<TblProjectsMenuType, bool>> expression);

        Task<List<TblRolesPage>> GetNavigationByUser(int projectId, int userId);
    }
}