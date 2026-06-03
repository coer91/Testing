using System.Linq.Expressions;
using Repositories.HWMXCore.Database;

namespace Repositories.HWMXCore.Interfaces
{
	public interface IProjectsSubmodulesRepository
	{
		Task<bool> ExistsProjectSubmodule(Expression<Func<TblProjectsSubmodule, bool>> expression);
        Task<TblProjectsSubmodule> GetProjectSubmoduleBy(Expression<Func<TblProjectsSubmodule, bool>> expression);
		Task<List<TblProjectsSubmodule>> GetProjectSubmoduleList(Expression<Func<TblProjectsSubmodule, bool>> expression);
		Task<TblProjectsSubmodule> CreateProjectSubmodule(TblProjectsSubmodule entity);
		Task<TblProjectsSubmodule> UpdateProjectSubmodule(TblProjectsSubmodule entity);
        Task<List<TblProjectsSubmodule>> UpdateProjectSubmoduleSequence(IEnumerable<TblProjectsSubmodule> entities);
        Task<int> DeleteProjectSubmodule(TblProjectsSubmodule entity); 
	}
}