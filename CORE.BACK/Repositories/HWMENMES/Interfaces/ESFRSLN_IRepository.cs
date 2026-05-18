using Repositories.HWMENMES.Database; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Interfaces
{
    /// <summary>
    /// TRANSLATE   
    /// </summary>
    public interface ESFRSLN_IRepository
    {
        Task<ESFRSLN> GetTranslateBy(Expression<Func<ESFRSLN, bool>> expression);
        Task<List<ESFRSLN>> GetTranslateList(Expression<Func<ESFRSLN, bool>> expression); 
    }
} 