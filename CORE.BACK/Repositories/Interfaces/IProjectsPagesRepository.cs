using System.Linq.Expressions;
using Repositories.Database;

namespace Repositories.Interfaces
{
	public interface IProjectsPagesRepository
	{
		Task<bool> ExistsProjectPage(Expression<Func<TblProjectsPage, bool>> expression);
        Task<TblProjectsPage> GetProjectPageBy(Expression<Func<TblProjectsPage, bool>> expression);
		Task<List<TblProjectsPage>> GetProjectPageList(Expression<Func<TblProjectsPage, bool>> expression);
		Task<TblProjectsPage> CreateProjectPage(TblProjectsPage entity);
		Task<TblProjectsPage> UpdateProjectPage(TblProjectsPage entity);
        Task<List<TblProjectsPage>> UpdateProjectPageSequence(IEnumerable<TblProjectsPage> entities);
        Task<int> DeleteProjectPage(TblProjectsPage entity);
	}
}