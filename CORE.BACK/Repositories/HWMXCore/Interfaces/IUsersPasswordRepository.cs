using System.Linq.Expressions;
using Repositories.HWMXCore.Database;

namespace Repositories.HWMXCore.Interfaces
{
    public interface IUsersPasswordRepository
    { 
        Task<TblUsersPassword> GetUserPasswordBy(Expression<Func<TblUsersPassword, bool>> expression); 
        Task<TblUsersPassword> CreateUserPassword(TblUsersPassword entity);
        Task<TblUsersPassword> UpdateUserPassword(TblUsersPassword entity);
        Task<int> DeleteUserPassword(TblUsersPassword entity);
    }
}