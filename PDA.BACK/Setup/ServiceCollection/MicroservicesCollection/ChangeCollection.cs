using Microservices.Interfaces.Change;
using Microservices.Services.Change;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class ChangeCollection
    {
        public static IServiceCollection AddChangeCollection(this IServiceCollection service)
        {
            service.AddTransient<IInspectionReturnService, InspectionReturnService>();
            service.AddTransient<IVendorReturnService, VendorReturnService>();
            return service;
        }
    }
} 