using Microservices.Interfaces.Shortage;
using Microservices.Services.Shortage;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class ShortageCollection
    {
        public static IServiceCollection AddShortageCollection(this IServiceCollection service)
        {
            service.AddTransient<IInventoryCheckInCellService, InventoryCheckInCellService>();
            service.AddTransient<ILampTurnOnListService, LampTurnOnListService>();
            service.AddTransient<IShortageListService, ShortageListService>();
            service.AddTransient<ITraceLOTLocationService, TraceLOTLocationService>();
            return service;
        }
    }
} 