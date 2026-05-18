using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Repository
{
    /// <summary>
    /// TRANSLATE
    /// </summary>
    public class ESFRSLN_Repository(HWMENMESContext _context) : ESFRSLN_IRepository
    {
        public async Task<ESFRSLN> GetTranslateBy(Expression<Func<ESFRSLN, bool>> expression)
        {
            List<ESFRSLN> entities = await _context.ESFRSLN
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();

            return entities.FirstOrDefault();
        }

        public async Task<List<ESFRSLN>> GetTranslateList(Expression<Func<ESFRSLN, bool>> expression)
        {
            return await _context.ESFRSLN
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }
    }
} 