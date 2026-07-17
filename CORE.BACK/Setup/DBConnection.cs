using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repositories.Database; 
using HWMX.DotNet;

namespace Setup
{
    public static class DBConnection
    {
        public static IServiceCollection AddDBConnection(this IServiceCollection context, IConfiguration configuration, ServiceLifetime serviceLifetime = ServiceLifetime.Scoped)
        { 
            context.AddDbContext<HWMXCoreContext>(options => options.UseSqlServer(configuration.GetConnectionString("HWMXCore")), serviceLifetime);
            context.AddTransactionService<HWMXCoreContext>();
            return context;
        }
    }
}