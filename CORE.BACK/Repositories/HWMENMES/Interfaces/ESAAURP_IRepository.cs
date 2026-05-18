using Repositories.HWMENMES.Database; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Interfaces
{
    /// <summary>
    /// USER ROLE
    /// </summary>
    public interface ESAAURP_IRepository
    {
        Task<ESAAURP> GetUserRoleBy(Expression<Func<ESAAURP, bool>> expression);
        Task<List<ESAAURP>> GetUserRoleList(Expression<Func<ESAAURP, bool>> expression);
    }
}
