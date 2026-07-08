using Microsoft.EntityFrameworkCore; 
using Repositories.Database;
using Repositories.Interfaces;
using System.Linq.Expressions;

namespace Repositories.Repository
{
    public class UsersRolesRepository(HWMXCoreContext _context) : IUsersRolesRepository
    {

        public async Task<bool> ExistsUserRole(Expression<Func<TblUsersRole, bool>> expression)
            => await _context.TblUsersRoles.AnyAsync(expression);


        public async Task<TblUsersRole> GetUserRoleBy(Expression<Func<TblUsersRole, bool>> expression)
        {
            return await _context.TblUsersRoles
                .Include(x => x.User)
                .Include(x => x.Role) 
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
        }


        public async Task<List<TblUsersRole>> GetUserRoleList(Expression<Func<TblUsersRole, bool>> expression)
        {
            return await _context.TblUsersRoles
                .Include(x => x.User)
                .Include(x => x.Role)
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<TblUsersRole> CreateUserRole(TblUsersRole entity)
        {
            await _context.TblUsersRoles.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<List<TblUsersRole>> CreateUserRole(IEnumerable<TblUsersRole> entities)
        {
            await _context.TblUsersRoles.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
            return [.. entities];
        }


        public async Task<TblUsersRole> UpdateUserRole(TblUsersRole entity)
        {
            _context.TblUsersRoles.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<List<TblUsersRole>> UpdateUserRole(IEnumerable<TblUsersRole> entities)
        {
            _context.TblUsersRoles.UpdateRange(entities);
            await _context.SaveChangesAsync();
            return [.. entities];
        }


        public async Task<int> DeleteUserRole(TblUsersRole entity)
        {
            _context.TblUsersRoles.Remove(entity);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        }


        public async Task<int> DeleteUserRole(IEnumerable<TblUsersRole> entities)
        {
            _context.TblUsersRoles.RemoveRange(entities);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        } 
    }
}