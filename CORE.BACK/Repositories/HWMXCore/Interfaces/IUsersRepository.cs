using System.Linq.Expressions;
using Repositories.HWMXCore.Database;

namespace Repositories.HWMXCore.Interfaces
{
    public interface IUsersRepository
    {
        Task<bool> ExistsUser(Expression<Func<TblUser, bool>> expression);
        Task<TblUser> GetUserBy(Expression<Func<TblUser, bool>> expression);
        Task<List<TblUser>> GetUserList(Expression<Func<TblUser, bool>> expression);
        Task<TblUser> CreateUser(TblUser entity);
        Task<TblUser> UpdateUser(TblUser entity);
        Task<int> DeleteUser(TblUser entity);
    }
}