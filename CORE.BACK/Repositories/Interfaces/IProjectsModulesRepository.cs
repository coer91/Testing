using Repositories.Database;
using System.Linq.Expressions; 

namespace Repositories.Interfaces
{
    public interface IProjectsModulesRepository
    {
        Task<bool> ExistsProjectModule(Expression<Func<TblProjectsModule, bool>> expression);
        Task<TblProjectsModule> GetProjectModuleBy(Expression<Func<TblProjectsModule, bool>> expression);
        Task<List<TblProjectsModule>> GetProjectModuleList(Expression<Func<TblProjectsModule, bool>> expression);
        Task<TblProjectsModule> CreateProjectModule(TblProjectsModule entity);
        Task<TblProjectsModule> UpdateProjectModule(TblProjectsModule entity);
        Task<List<TblProjectsModule>> UpdateProjectModuleSequence(IEnumerable<TblProjectsModule> entities);
        Task<int> DeleteProjectsModule(TblProjectsModule entity);
    }
}