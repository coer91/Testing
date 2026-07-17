using Microservices.Interfaces.Location;
using Microservices.Services.Location;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class LocationCollection
    {
        public static IServiceCollection AddLocationCollection(this IServiceCollection service)
        {
            service.AddTransient<ICasePalletVerificationService, CasePalletVerificationService>();
            service.AddTransient<IDiecastingStocktakingService, DiecastingStocktakingService>();
            service.AddTransient<IEngineStocktakingService, EngineStocktakingService>();
            service.AddTransient<IEngineWipStocktakingService, EngineWipStocktakingService>();
            service.AddTransient<IIngotLocationService, IngotLocationService>();
            service.AddTransient<IIndicateLocationService, IndicateLocationService>();
            service.AddTransient<ITrollyConfigurationService, TrollyConfigurationService>(); 
            service.AddTransient<IMaterialMoveService, MaterialMoveService>();
            service.AddTransient<IPalletLocationService, PalletLocationService>();
            service.AddTransient<IPalletMoveService, PalletMoveService>();
            service.AddTransient<IStocktakingLinesideService, StocktakingLinesideService>();
            service.AddTransient<IThreeCStocktakingService, ThreeCStocktakingService>();
            return service;
        }
    }
} 