using Microservices.Interfaces.Store;
using Microservices.Services.Store;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class StoreCollection
    {
        public static IServiceCollection AddStoreCollection(this IServiceCollection service)
        {
            service.AddTransient<ICcEntryService, CcEntryService>(); 
            service.AddTransient<IContainerService, ContainerService>(); 
            service.AddTransient<IImportEngineService, ImportEngineService>();
            service.AddTransient<IIngotWeightService, IngotWeightService>();
            service.AddTransient<IGkdEntryService, GkdEntryService>();
            service.AddTransient<ILpEntryService, LpEntryService>();
            service.AddTransient<IManualStockInService, ManualStockInService>();
            return service;
        }
    }
} 