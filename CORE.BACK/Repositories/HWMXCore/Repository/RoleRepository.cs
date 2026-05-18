using Microsoft.EntityFrameworkCore;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Database;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Repository
{
	public class RoleRepository(HWMXCoreContext _context) : IRoleRepository
	{

		public async Task<bool> ExistsRole(Expression<Func<TblRole, bool>> expression)
		{
			return await _context.TblRoles
				.AsNoTracking()
				.AnyAsync(expression);
		}


		public async Task<TblRole> GetRoleBy(Expression<Func<TblRole, bool>> expression)
		{
			return await _context.TblRoles
				.AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblRole>> GetRoleList(Expression<Func<TblRole, bool>> expression)
		{
			return await _context.TblRoles
				.Where(expression)
				.AsNoTracking()
				.ToListAsync();
		}


		public async Task<TblRole> CreateRole(TblRole entity)
		{
			await _context.TblRoles.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


        public async Task<List<TblRole>> CreateRole(IEnumerable<TblRole> entities)
        {
            await _context.TblRoles.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
            return [.. entities];
        }


        public async Task<TblRole> UpdateRole(TblRole entity)
		{
			_context.TblRoles.Update(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<int> DeleteRole(TblRole entity)
		{
			_context.TblRoles.Remove(entity);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}     }
}