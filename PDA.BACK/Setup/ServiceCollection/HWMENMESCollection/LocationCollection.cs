using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Location;
using Repositories.Repository.Location;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class LocationCollection
    {
        public static IServiceCollection AddLocationCollection(this IServiceCollection repository)
        {
            repository.AddTransient<ICasePalletVerificationRepository, CasePalletVerificationRepository>();
            repository.AddTransient<IDiecastingStocktakingRepository, DiecastingStocktakingRepository>();
            repository.AddTransient<IEngineStocktakingRepository, EngineStocktakingRepository>();
            repository.AddTransient<IEngineWipStocktakingRepository, EngineWipStocktakingRepository>();
            repository.AddTransient<IIngotLocationRepository, IngotLocationRepository>();
            repository.AddTransient<IIndicateLocationRepository, IndicateLocationRepository>();
            repository.AddTransient<ITrollyConfigurationRepository, TrollyConfigurationRepository>();
            repository.AddTransient<IMaterialMoveRepository, MaterialMoveRepository>();
            repository.AddTransient<IPalletLocationRepository, PalletLocationRepository>();
            repository.AddTransient<IPalletMoveRepository, PalletMoveRepository>();
            repository.AddTransient<IStocktakingLinesideRepository, StocktakingLinesideRepository>();
            repository.AddTransient<IThreeCStocktakingRepository, ThreeCStocktakingRepository>();
            return repository;
        }
    }
} 