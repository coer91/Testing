using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Shortage;
using Repositories.Repository.Shortage;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class ShortageCollection
    {
        public static IServiceCollection AddShortageCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IInventoryCheckInCellRepository, InventoryCheckInCellRepository>();
            repository.AddTransient<ILampTurnOnListRepository, LampTurnOnListRepository>();
            repository.AddTransient<IShortageListRepository, ShortageListRepository>();
            repository.AddTransient<ITraceLOTLocationRepository, TraceLOTLocationRepository>();
            return repository;
        }
    }
} 