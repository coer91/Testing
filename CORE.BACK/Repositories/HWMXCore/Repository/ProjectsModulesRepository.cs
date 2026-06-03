using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Database;

namespace Repositories.HWMXCore.Repository
{
    public class ProjectsModulesRepository(HWMXCoreContext _context) : IProjectsModulesRepository
    {

        public async Task<bool> ExistsProjectModule(Expression<Func<TblProjectsModule, bool>> expression)
            => await _context.TblProjectsModules.AsNoTracking().AnyAsync(expression); 


        public async Task<TblProjectsModule> GetProjectModuleBy(Expression<Func<TblProjectsModule, bool>> expression)
        {
            return await _context.TblProjectsModules
                .Include(x => x.Project)
                .Include(x => x.TblProjectsSubmodules).ThenInclude(x => x.MenuType)
                .Include(x => x.TblProjectsPages.Where(x => x.SubmoduleId == null))
                .Include(x => x.MenuType)
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
        }


        public async Task<List<TblProjectsModule>> GetProjectModuleList(Expression<Func<TblProjectsModule, bool>> expression)
        {
            return await _context.TblProjectsModules
                .Include(x => x.Project) 
                .Include(x => x.MenuType)
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<TblProjectsModule> CreateProjectModule(TblProjectsModule entity)
        {
            await _context.TblProjectsModules.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<TblProjectsModule> UpdateProjectModule(TblProjectsModule entity)
        {
            _context.TblProjectsModules.Update(entity);
            _context.TblProjectsModules.Entry(entity).Property(x => x.Sequence).IsModified = false;
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<List<TblProjectsModule>> UpdateProjectModuleSequence(IEnumerable<TblProjectsModule> entities)
        {
            foreach (var entity in entities)
            {
                _context.TblProjectsModules.Attach(entity);
                _context.Entry(entity).Property(x => x.Sequence).IsModified = true;
            }

            await _context.SaveChangesAsync();
            return [.. entities];
        }


        public async Task<int> DeleteProjectsModule(TblProjectsModule entity)
        {
            _context.TblProjectsModules.Remove(entity);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        } 
    }
}