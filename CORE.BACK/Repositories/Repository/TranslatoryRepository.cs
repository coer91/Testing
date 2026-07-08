using Microsoft.EntityFrameworkCore;
using Repositories.Database;
using Repositories.Interfaces; 
using System.Linq.Expressions; 

namespace Repositories.Repository
{
    public class TranslatoryRepository(HWMXCoreContext _context) : ITranslatoryRepository
    {
        public async Task<TblTranslatory> GetTranslatoryBy(Expression<Func<TblTranslatory, bool>> expression)
        {
            return await _context.TblTranslatories
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
        }


        public async Task<TblTranslatory> CreateTranslatory(TblTranslatory entity)
        {
            await _context.TblTranslatories.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<TblTranslatory> UpdateTranslatory(TblTranslatory entity)
        {
            _context.TblTranslatories.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<int> DeleteTranslatory(TblTranslatory entity)
        {
            _context.TblTranslatories.Remove(entity);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        } 
    }
} 