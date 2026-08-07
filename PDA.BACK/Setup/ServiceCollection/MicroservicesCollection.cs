using Microsoft.Extensions.DependencyInjection;
using Setup.ServiceCollection.MicroservicesCollection;
using Microservices.Interfaces;
using Microservices.Services;

namespace Setup
{
    public static class MicroservicesCollection
    {
        public static IServiceCollection AddMicroserviceCollection(this IServiceCollection service)
        {
            service.AddDeliveryCollection();
            service.AddLocationCollection();
            service.AddLotCollection();
            service.AddStoreCollection();
            service.AddTransient<IMasterService, MasterService>();
            return service;
        }
    }
} 