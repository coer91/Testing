using Microservices.Interfaces.Recycle;
using Microservices.Services.Recycle;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class RecycleCollection
    {
        public static IServiceCollection AddRecycleCollection(this IServiceCollection service)
        {
            service.AddTransient<IEngineReturnService, EngineReturnService>();
            service.AddTransient<IMovementEngineService, MovementEngineService>();
            service.AddTransient<IReceivingRecyclePartsService, ReceivingRecyclePartsService>();
            return service;
        }
    }
} 