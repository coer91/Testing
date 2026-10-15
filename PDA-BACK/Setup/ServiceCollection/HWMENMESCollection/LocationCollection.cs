using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Location;
using Repositories.Repository.Location;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class LocationCollection
    {
        public static IServiceCollection AddLocationCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IIndicateLocationRepository, IndicateLocationRepository>();
            repository.AddTransient<IMoveMaterialRepository, MoveMaterialRepository>();
            repository.AddTransient<ITrollyConfigurationRepository, TrollyConfigurationRepository>();
            repository.AddTransient<IEngineStocktakingRepository, EngineStocktakingRepository>();
            return repository;
        }
    }
}
