using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repositories.Database;

namespace Setup
{
    public static class DBConnection
    {
        public static IServiceCollection AddDBConnection(this IServiceCollection context, IConfiguration configuration, ServiceLifetime serviceLifetime = ServiceLifetime.Scoped)
        {
            context.AddDbContext<HWMENMESContext>(options => options.UseOracle(configuration.GetConnectionString("HWMENMES")), serviceLifetime);
            return context;
        }
    }
}