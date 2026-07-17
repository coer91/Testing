using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Recycle;
using Repositories.Repository.Recycle;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class RecycleCollection
    {
        public static IServiceCollection AddRecycleCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IEngineReturnRepository, EngineReturnRepository>();
            repository.AddTransient<IMovementEngineRepository, MovementEngineRepository>();
            repository.AddTransient<IReceivingRecyclePartsRepository, ReceivingRecyclePartsRepository>();
            return repository;
        }
    }
} 