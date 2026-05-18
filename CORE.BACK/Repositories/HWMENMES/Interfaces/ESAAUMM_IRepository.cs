using Repositories.HWMENMES.Database;
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Interfaces
{
    /// <summary>
    /// PAGES
    /// </summary>
    public interface ESAAUMM_IRepository
    {
        Task<ESAAUMM> GetPageBy(Expression<Func<ESAAUMM, bool>> expression);
        Task<List<ESAAUMM>> GetPageList(Expression<Func<ESAAUMM, bool>> expression);
        Task<List<ESAAUMM>> GetPagesByUser(string user);
    }
}