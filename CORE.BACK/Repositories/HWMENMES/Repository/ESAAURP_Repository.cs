using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Repository
{
    /// <summary>
    /// USER ROLE
    /// </summary>
    public class ESAAURP_Repository(HWMENMESContext _context) : IESAAURP_Repository
    {
        public async Task<ESAAURP> GetUserRoleBy(Expression<Func<ESAAURP, bool>> expression)
        {
            List<ESAAURP> entities = await _context.ESAAURP
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();

            return entities.FirstOrDefault();
        }

        public async Task<List<ESAAURP>> GetUserRoleList(Expression<Func<ESAAURP, bool>> expression)
        {
            return await _context.ESAAURP
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
