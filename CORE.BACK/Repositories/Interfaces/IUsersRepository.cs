using Repositories.Database;
using System.Linq.Expressions;
using HWMX.DotNet.ORM;

namespace Repositories.Interfaces
{
    public interface IUsersRepository
    {
        Task<ResponseProcedure> Login(string user, string password);
        Task<ResponseProcedure> GetUserOracle(string user);
        Task<ResponseProcedure> GetUserListOracle(string departmentCode, bool onlyActive = true);
        Task<bool> ExistsUser(Expression<Func<TblUser, bool>> expression);
        Task<TblUser> GetUserBy(Expression<Func<TblUser, bool>> expression);
        Task<List<TblUser>> GetUserList(Expression<Func<TblUser, bool>> expression);
        Task<TblUser> CreateUser(TblUser entity);
        Task<TblUser> UpdateUser(TblUser entity); 
    }
}