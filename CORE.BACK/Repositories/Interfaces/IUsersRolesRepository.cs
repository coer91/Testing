using System.Linq.Expressions;
using Repositories.Database;

namespace Repositories.Interfaces
{
    public interface IUsersRolesRepository
    {
        Task<bool> ExistsUserRole(Expression<Func<TblUsersRole, bool>> expression);
        Task<TblUsersRole> GetUserRoleBy(Expression<Func<TblUsersRole, bool>> expression);
        Task<List<TblUsersRole>> GetUserRoleList(Expression<Func<TblUsersRole, bool>> expression);
        Task<TblUsersRole> CreateUserRole(TblUsersRole entity);
        Task<List<TblUsersRole>> CreateUserRole(IEnumerable<TblUsersRole> entities);
        Task<TblUsersRole> UpdateUserRole(TblUsersRole entity);
        Task<List<TblUsersRole>> UpdateUserRole(IEnumerable<TblUsersRole> entities);
        Task<int> DeleteUserRole(TblUsersRole entity);
        Task<int> DeleteUserRole(IEnumerable<TblUsersRole> entities);
    }
}