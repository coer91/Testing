using System.Linq.Expressions;
using Repositories.HWMXCore.Database;

namespace Repositories.HWMXCore.Interfaces
{
	public interface IRolesPagesRepository
    {
		Task<bool> ExistsRolePage(Expression<Func<TblRolesPage, bool>> expression); 
        Task<TblRolesPage> GetRolePageBy(Expression<Func<TblRolesPage, bool>> expression);
		Task<List<TblRolesPage>> GetRolePageList(Expression<Func<TblRolesPage, bool>> expression);
		Task<TblRolesPage> CreateRolePage(TblRolesPage entity);
		Task<List<TblRolesPage>> CreateRolePage(IEnumerable<TblRolesPage> entities);
		Task<TblRolesPage> UpdateRolePage(TblRolesPage entity);
		Task<List<TblRolesPage>> UpdateRolePage(IEnumerable<TblRolesPage> entities);
		Task<int> DeleteRolePage(TblRolesPage entity);
		Task<int> DeleteRolePage(IEnumerable<TblRolesPage> entities);
	}
}