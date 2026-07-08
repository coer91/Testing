using Microsoft.EntityFrameworkCore; 
using Repositories.Database;
using Repositories.Interfaces;
using System.Linq.Expressions;

namespace Repositories.Repository
{
	public class ProjectsSubmodulesRepository(HWMXCoreContext _context) : IProjectsSubmodulesRepository
	{

        public async Task<bool> ExistsProjectSubmodule(Expression<Func<TblProjectsSubmodule, bool>> expression)
            => await _context.TblProjectsSubmodules.AsNoTracking().AnyAsync(expression);


        public async Task<TblProjectsSubmodule> GetProjectSubmoduleBy(Expression<Func<TblProjectsSubmodule, bool>> expression)
		{
			return await _context.TblProjectsSubmodules
				.Include(x => x.Module).ThenInclude(x => x.Project)
                .Include(x => x.Module).ThenInclude(x => x.MenuType)
                .Include(x => x.TblProjectsPages)
				.Include(x => x.MenuType)
                .AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblProjectsSubmodule>> GetProjectSubmoduleList(Expression<Func<TblProjectsSubmodule, bool>> expression)
		{
			return await _context.TblProjectsSubmodules
                .Include(x => x.Module).ThenInclude(x => x.Project)
                .Include(x => x.Module).ThenInclude(x => x.MenuType) 
                .Include(x => x.MenuType)
                .Where(expression)
				.AsNoTracking()
				.ToListAsync();
		}


		public async Task<TblProjectsSubmodule> CreateProjectSubmodule(TblProjectsSubmodule entity)
		{
			await _context.TblProjectsSubmodules.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<TblProjectsSubmodule> UpdateProjectSubmodule(TblProjectsSubmodule entity)
		{
			_context.TblProjectsSubmodules.Update(entity);
            _context.TblProjectsSubmodules.Entry(entity).Property(x => x.Sequence).IsModified = false;
            await _context.SaveChangesAsync();
			return entity;
		}


        public async Task<List<TblProjectsSubmodule>> UpdateProjectSubmoduleSequence(IEnumerable<TblProjectsSubmodule> entities)
        {
            foreach (var entity in entities)
            {
                _context.TblProjectsSubmodules.Attach(entity);
                _context.Entry(entity).Property(x => x.Sequence).IsModified = true;
            }

            await _context.SaveChangesAsync();
            return [.. entities];
        }


        public async Task<int> DeleteProjectSubmodule(TblProjectsSubmodule entity)
		{
			_context.TblProjectsSubmodules.Remove(entity);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}
	}
}