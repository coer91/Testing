using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Store;
using Repositories.Repository.Store; 

namespace Setup.ServiceCollection.HWMENMESCollection 
{
    public static class StoreCollection
    {
        public static IServiceCollection AddStoreCollection(this IServiceCollection repository)
        {
            repository.AddTransient<ICcEntryRepository, CcEntryRepository>();
            repository.AddTransient<IContainerRepository, ContainerRepository>(); 
            repository.AddTransient<IImportEngineRepository, ImportEngineRepository>();
            repository.AddTransient<IIngotWeightRepository, IngotWeightRepository>();
            repository.AddTransient<IGkdEntryRepository, GkdEntryRepository>();
            repository.AddTransient<ILpEntryRepository, LpEntryRepository>();
            repository.AddTransient<IManualStockInRepository, ManualStockInRepository>();
            return repository;
        }
    }
} 