using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Repositories.Database;
using Repositories.Interfaces;

namespace Repositories.Repository
{
	public class ProjectsPagesRepository(HWMXCoreContext _context) : IProjectsPagesRepository
	{

        public async Task<bool> ExistsProjectPage(Expression<Func<TblProjectsPage, bool>> expression)
            => await _context.TblProjectsPages.AsNoTracking().AnyAsync(expression);


        public async Task<TblProjectsPage> GetProjectPageBy(Expression<Func<TblProjectsPage, bool>> expression)
		{
			return await _context.TblProjectsPages
				.Include(x => x.Project)
                .Include(x => x.Module).ThenInclude(x => x.Translatory)
                .Include(x => x.Module)
                .Include(x => x.Submodule).ThenInclude(x => x.Translatory)
                .Include(x => x.Submodule)
                .Include(x => x.TblRolesPages).ThenInclude(x => x.Role)
                .Include(x => x.Translatory)
                .AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblProjectsPage>> GetProjectPageList(Expression<Func<TblProjectsPage, bool>> expression)
		{
			return await _context.TblProjectsPages
                .Include(x => x.Project)
                .Include(x => x.Module).ThenInclude(x => x.Translatory)
                .Include(x => x.Module)
                .Include(x => x.Submodule).ThenInclude(x => x.Translatory)
                .Include(x => x.Submodule)
                .Include(x => x.Translatory)
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