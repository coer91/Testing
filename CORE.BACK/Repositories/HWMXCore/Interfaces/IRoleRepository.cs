using Repositories.HWMXCore.Database;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Interfaces
{
	public interface IRoleRepository
	{
		Task<bool> ExistsRole(Expression<Func<TblRole, bool>> expression);
		Task<TblRole> GetRoleBy(Expression<Func<TblRole, bool>> expression);
		Task<List<TblRole>> GetRoleList(Expression<Func<TblRole, bool>> expression);
		Task<TblRole> CreateRole(TblRole entity);
        Task<List<TblRole>> CreateRole(IEnumerable<TblRole> entity);
        Task<TblRole> UpdateRole(TblRole entity);
		Task<int> DeleteRole(TblRole entity);
	}
}