using Microsoft.Extensions.DependencyInjection; 
using Microservices.Interfaces;
using Microservices.Services;

namespace Setup
{
    public static class MicroservicesCollection
    {
        public static IServiceCollection AddMicroserviceCollection(this IServiceCollection service)
        {
            service.AddTransient<IAuthService, AuthService>();
            service.AddTransient<IMasterService, MasterService>();
            service.AddTransient<INavigationService, NavigationService>();
            service.AddTransient<IProjectsModulesService, ProjectsModulesService>();
            service.AddTransient<IProjectsPagesService, ProjectsPagesService>();
            service.AddTransient<ProjectsIService, ProjectsService>();
            service.AddTransient<ProjectsSubmodulesIService, ProjectsSubmodulesService>();
            service.AddTransient<IRolesPagesSevice, RolesPagesSevice>();
            service.AddTransient<IRolesService, RolesService>();
            service.AddTransient<UsersRolesIService, UsersRolesService>(); 
			service.AddTransient<IUsersService, UsersService>();
            return service;
        }
    }
}
