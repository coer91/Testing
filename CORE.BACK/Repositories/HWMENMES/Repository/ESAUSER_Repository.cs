using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Repository
{
    /// <summary>
    /// USERS
    /// </summary>
    public class ESAUSER_Repository(HWMENMESContext _context) : ESAUSER_IRepository
    { 
        public async Task<ESAUSER> GetUserBy(Expression<Func<ESAUSER, bool>> expression)
        {
            List<ESAUSER> entities = await _context.ESAUSER
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();

            return entities.FirstOrDefault();
        }


        public async Task<List<ESAUSER>> GetUserList(Expression<Func<ESAUSER, bool>> expression)
        {
            return await _context.ESAUSER
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }
    }
} 