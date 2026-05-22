using Repositories.HWMENMES.Database; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Interfaces
{
    /// <summary>
    /// USERS
    /// </summary>
    public interface IESAUSER_Repository
    {
        Task<ESAUSER> GetUserBy(Expression<Func<ESAUSER, bool>> expression);
        Task<List<ESAUSER>> GetUserList(Expression<Func<ESAUSER, bool>> expression);
    }
}
