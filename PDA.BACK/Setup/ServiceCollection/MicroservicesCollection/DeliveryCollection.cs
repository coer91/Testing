using Microservices.Interfaces.Delivery;
using Microservices.Services.Delivery;
using Microsoft.Extensions.DependencyInjection;  

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class DeliveryCollection
    {
        public static IServiceCollection AddDeliveryCollection(this IServiceCollection service)
        { 
            service.AddTransient<ICcDeliveryService, CcDeliveryServiceService>();
            service.AddTransient<IPermitGateService, PermitGateService>();
            return service;
        }
    }
}