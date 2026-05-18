using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Repository
{
    /// <summary>
    /// ROLE PAGE
    /// </summary>
    public class ESAAURF_Repository(HWMENMESContext _context) : ESAAURF_IRepository
    { 
        public async Task<ESAAURF> GetRolePageBy(Expression<Func<ESAAURF, bool>> expression)
        {
            List<ESAAURF> entities = await _context.ESAAURF
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();

            return entities.FirstOrDefault();
        }


        public async Task<List<ESAAURF>> GetRolePageList(Expression<Func<ESAAURF, bool>> expression)
        {
            return await _context.ESAAURF
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
