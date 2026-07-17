using Microservices.Interfaces;
using Microservices.Services;
using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces;
using Repositories.Repository;
using Setup.ServiceCollection.MicroservicesCollection;

namespace Setup
{
    public static class MicroservicesCollection
    {
        public static IServiceCollection AddMicroserviceCollection(this IServiceCollection service)
        {
            service.AddChangeCollection();
            service.AddDefectCollection();
            service.AddDeliveryCollection();
            service.AddLocationCollection();
            service.AddLotCollection();
            service.AddProductCollection();
            service.AddRecycleCollection();
            service.AddShortageCollection();
            service.AddStoreCollection();
            service.AddTransient<IMasterService, MasterService>();
            return service;
        }
    }
} 