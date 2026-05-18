using Microsoft.EntityFrameworkCore; 
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Repository
{
    public class UsersRepository(HWMXCoreContext _context) : IUsersRepository
    { 
        public async Task<bool> ExistsUser(Expression<Func<TblUser, bool>> expression)
        {
            return await _context.TblUsers
                .AsNoTracking()
                .AnyAsync(expression);
        }


        public async Task<TblUser> GetUserBy(Expression<Func<TblUser, bool>> expression)
        {
            return await _context.TblUsers 
                .Include(x => x.Partner)
                .Include(x => x.TblUsersRoles).ThenInclude(x => x.Role)
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
        }


        public async Task<List<TblUser>> GetUserList(Expression<Func<TblUser, bool>> expression)
        {
            return await _context.TblUsers 
                .Include(x => x.Partner)
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<TblUser> CreateUser(TblUser entity)
        {
            await _context.TblUsers.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        } 


        public async Task<TblUser> UpdateUser(TblUser entity)
        {
            _context.TblUsers.Update(entity); 
            await _context.SaveChangesAsync();
            return entity;
        } 


        public async Task<int> DeleteUser(TblUser entity)
        {
            _context.TblUsers.Remove(entity);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        } 
    }
}