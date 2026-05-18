using Microsoft.EntityFrameworkCore; 
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Repository
{
	public class RolesPagesRepository(HWMXCoreContext _context) : IRolesPagesRepository
    {

        public async Task<bool> ExistsRolePage(Expression<Func<TblRolesPage, bool>> expression)
            => await _context.TblRolesPages.AsNoTracking().AnyAsync(expression);

        public async Task<TblRolesPage> GetRolePageBy(Expression<Func<TblRolesPage, bool>> expression)
		{
			return await _context.TblRolesPages
                .Include(x => x.Page).ThenInclude(x => x.Project)
                .Include(x => x.Page).ThenInclude(x => x.Module).ThenInclude(x => x.MenuType)
                .Include(x => x.Page).ThenInclude(x => x.Submodule).ThenInclude(x => x.MenuType)
                .Include(x => x.Role)
                .AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblRolesPage>> GetRolePageList(Expression<Func<TblRolesPage, bool>> expression)
		{
			return await _context.TblRolesPages
                .Include(x => x.Page).ThenInclude(x => x.Project)
                .Include(x => x.Page).ThenInclude(x => x.Module).ThenInclude(x => x.MenuType)
                .Include(x => x.Page).ThenInclude(x => x.Submodule).ThenInclude(x => x.MenuType)
                .Include(x => x.Role)
                .Where(expression)
				.AsNoTracking()
				.ToListAsync();
		}


		public async Task<TblRolesPage> CreateRolePage(TblRolesPage entity)
		{
			await _context.TblRolesPages.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<List<TblRolesPage>> CreateRolePage(IEnumerable<TblRolesPage> entities)
		{
			await _context.TblRolesPages.AddRangeAsync(entities);
			await _context.SaveChangesAsync();
			return entities.ToList();
		}


		public async Task<TblRolesPage> UpdateRolePage(TblRolesPage entity)
		{
			_context.TblRolesPages.Update(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<List<TblRolesPage>> UpdateRolePage(IEnumerable<TblRolesPage> entities)
		{
			_context.TblRolesPages.UpdateRange(entities);
			await _context.SaveChangesAsync();
			return entities.ToList();
		}


		public async Task<int> DeleteRolePage(TblRolesPage entity)
		{
			_context.TblRolesPages.Remove(entity);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}


		public async Task<int> DeleteRolePage(IEnumerable<TblRolesPage> entities)
		{
			_context.TblRolesPages.RemoveRange(entities);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}
	}
}