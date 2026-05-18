using Repositories.HWMENMES.Database;
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Interfaces
{
    /// <summary>
    /// ROLE PAGE
    /// </summary>
    public interface ESAAURF_IRepository
    {
        Task<ESAAURF> GetRolePageBy(Expression<Func<ESAAURF, bool>> expression);
        Task<List<ESAAURF>> GetRolePageList(Expression<Func<ESAAURF, bool>> expression); 
    }
}
