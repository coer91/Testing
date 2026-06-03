using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces;

namespace Repositories.HWMXCore.Repository
{
	public class ProjectsPagesRepository(HWMXCoreContext _context) : IProjectsPagesRepository
	{

        public async Task<bool> ExistsProjectPage(Expression<Func<TblProjectsPage, bool>> expression)
            => await _context.TblProjectsPages.AsNoTracking().AnyAsync(expression);


        public async Task<TblProjectsPage> GetProjectPageBy(Expression<Func<TblProjectsPage, bool>> expression)
		{
			return await _context.TblProjectsPages
				.Include(x => x.Project)
                .Include(x => x.Module).ThenInclude(x => x.MenuType)
                .Include(x => x.Submodule).ThenInclude(x => x.MenuType)
                .Include(x => x.TblRolesPages).ThenInclude(x => x.Role)
                .AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblProjectsPage>> GetProjectPageList(Expression<Func<TblProjectsPage, bool>> expression)
		{
			return await _context.TblProjectsPages
                .Include(x => x.Project)
                .Include(x => x.Module).ThenInclude(x => x.MenuType)
                .Include(x => x.Submodule).ThenInclude(x => x.MenuType)
                .Where(expression)
				.AsNoTracking()
				.ToListAsync();
		}


		public async Task<TblProjectsPage> CreateProjectPage(TblProjectsPage entity)
		{
			await _context.TblProjectsPages.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<TblProjectsPage> UpdateProjectPage(TblProjectsPage entity)
		{
			_context.TblProjectsPages.Update(entity);
			_context.TblProjectsPages.Entry(entity).Property(x => x.Sequence).IsModified = false;
			await _context.SaveChangesAsync();
			return entity;
		}


        public async Task<List<TblProjectsPage>> UpdateProjectPageSequence(IEnumerable<TblProjectsPage> entities)
        {
            foreach (var entity in entities)
            {
                _context.TblProjectsPages.Attach(entity);
                _context.Entry(entity).Property(x => x.Sequence).IsModified = true;
            }
			 
            await _context.SaveChangesAsync();
            return [.. entities];
        }


        public async Task<int> DeleteProjectPage(TblProjectsPage entity)
		{
			_context.TblProjectsPages.Remove(entity);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}
	}
}