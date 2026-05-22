using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Repository
{
    public class MES_STORAGE_MA_Repository(HWMENMESContext _context) : IMES_STORAGE_MA_Repository
    {
        public async Task<MES_STORAGE_MA> GetStorageBy(Expression<Func<MES_STORAGE_MA, bool>> expression)
        {
            List<MES_STORAGE_MA> entities = await _context.MES_STORAGE_MA
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();

            return entities.FirstOrDefault();
        }


        public async Task<List<MES_STORAGE_MA>> GetStorageList(Expression<Func<MES_STORAGE_MA, bool>> expression)
        {
            return await _context.MES_STORAGE_MA
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }
    }
} 