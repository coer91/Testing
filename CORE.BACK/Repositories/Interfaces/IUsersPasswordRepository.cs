using System.Linq.Expressions;
using Repositories.Database;

namespace Repositories.Interfaces
{
    public interface IUsersPasswordRepository
    { 
        Task<TblUsersPassword> GetUserPasswordBy(Expression<Func<TblUsersPassword, bool>> expression); 
        Task<TblUsersPassword> CreateUserPassword(TblUsersPassword entity);
        Task<TblUsersPassword> UpdateUserPassword(TblUsersPassword entity);
        Task<int> DeleteUserPassword(TblUsersPassword entity);
    }
}