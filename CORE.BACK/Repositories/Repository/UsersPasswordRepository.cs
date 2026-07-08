using Microsoft.EntityFrameworkCore; 
using Repositories.Database;
using Repositories.Interfaces;
using System.Linq.Expressions;

namespace Repositories.Repository
{
    public class UsersPasswordRepository(HWMXCoreContext _context) : IUsersPasswordRepository
    { 
        public async Task<TblUsersPassword> GetUserPasswordBy(Expression<Func<TblUsersPassword, bool>> expression)
        {
            return await _context.TblUsersPasswords
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
        }


        public async Task<TblUsersPassword> CreateUserPassword(TblUsersPassword entity)
        {
            await _context.TblUsersPasswords.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<TblUsersPassword> UpdateUserPassword(TblUsersPassword entity)
        {
            _context.TblUsersPasswords.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<int> DeleteUserPassword(TblUsersPassword entity)
        {
            _context.TblUsersPasswords.Remove(entity);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        }
    }
}