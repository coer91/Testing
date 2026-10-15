using Microservices.Interfaces.Location;
using Microservices.Services.Location;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class LocationCollection
    {
        public static IServiceCollection AddLocationCollection(this IServiceCollection service)
        { 
            service.AddTransient<IIndicateLocationService, IndicateLocationService>();
            service.AddTransient<IMoveMaterialService, MoveMaterialService>();
            service.AddTransient<ITrollyConfigurationService, TrollyConfigurationService>();
            service.AddTransient<IEngineStocktakingService, EngineStocktakingService>();
            return service;
        }
    }
}
