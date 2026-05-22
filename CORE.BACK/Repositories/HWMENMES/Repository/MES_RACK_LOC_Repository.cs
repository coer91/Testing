using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Repository
{
    public class MES_RACK_LOC_Repository(HWMENMESContext _context) : IMES_RACK_LOC_Repository
    {
        public async Task<MES_RACK_LOC_MA> GetRackLocationBy(Expression<Func<MES_RACK_LOC_MA, bool>> expression)
        {
            List<MES_RACK_LOC_MA> entities = await _context.MES_RACK_LOC_MA
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();

            return entities.FirstOrDefault();
        }


        public async Task<List<MES_RACK_LOC_MA>> GetRackLocationList(Expression<Func<MES_RACK_LOC_MA, bool>> expression)
        {
            return await _context.MES_RACK_LOC_MA
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        } 
    }
} 