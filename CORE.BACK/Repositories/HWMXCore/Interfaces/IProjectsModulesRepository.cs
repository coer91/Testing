using Repositories.HWMXCore.Database;
using System.Linq.Expressions; 

namespace Repositories.HWMXCore.Interfaces
{
    public interface IProjectsModulesRepository
    {
        Task<bool> ExistsProjectModule(Expression<Func<TblProjectsModule, bool>> expression);
        Task<TblProjectsModule> GetProjectModuleBy(Expression<Func<TblProjectsModule, bool>> expression);
        Task<List<TblProjectsModule>> GetProjectModuleList(Expression<Func<TblProjectsModule, bool>> expression);
        Task<TblProjectsModule> CreateProjectModule(TblProjectsModule entity);
        Task<TblProjectsModule> UpdateProjectModule(TblProjectsModule entity);
        Task<List<TblProjectsModule>> UpdateProjectModule(IEnumerable<TblProjectsModule> entities);
        Task<int> DeleteProjectsModule(TblProjectsModule entity);
    }
}