using Repositories.HWMENMES.Database;
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Interfaces
{
    /// <summary>
    /// ROLE PAGE
    /// </summary>
    public interface IESAAURF_Repository
    {
        Task<ESAAURF> GetRolePageBy(Expression<Func<ESAAURF, bool>> expression);
        Task<List<ESAAURF>> GetRolePageList(Expression<Func<ESAAURF, bool>> expression); 
    }
}
