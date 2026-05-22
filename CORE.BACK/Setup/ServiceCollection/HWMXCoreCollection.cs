using Microsoft.Extensions.DependencyInjection;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Repository;

namespace Setup
{
    public static class HWMXCoreCollection
    {
        public static IServiceCollection AddHWMXCoreCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IProjectsModulesRepository, ProjectsModulesRepository>();
            repository.AddTransient<IProjectsPagesRepository, ProjectsPagesRepository>();
            repository.AddTransient<IProjectsRepository, ProjectsRepository>();
            repository.AddTransient<IProjectsSubmodulesRepository, ProjectsSubmodulesRepository>();
            repository.AddTransient<IRoleRepository, RoleRepository>();
            repository.AddTransient<IRolesPagesRepository, RolesPagesRepository>();
            repository.AddTransient<IUsersPasswordRepository, UsersPasswordRepository>();
            repository.AddTransient<IUsersRepository, UsersRepository>();
            repository.AddTransient<IUsersRolesRepository, UsersRolesRepository>(); 
			repository.AddTransient<ILanguageRepository, LanguageRepository>();
            return repository;
        }
    }
}
