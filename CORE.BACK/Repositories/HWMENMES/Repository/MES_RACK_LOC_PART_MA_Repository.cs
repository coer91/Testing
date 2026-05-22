using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Repository
{
    public class MES_RACK_LOC_PART_MA_Repository(HWMENMESContext _context) : IMES_RACK_LOC_PART_MA_Repository
    {
        public async Task<List<MES_RACK_LOC_PART_MA>> GetRackLocationPartNoList(Expression<Func<MES_RACK_LOC_PART_MA, bool>> expression)
        {
            return await _context.MES_RACK_LOC_PART_MA
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
