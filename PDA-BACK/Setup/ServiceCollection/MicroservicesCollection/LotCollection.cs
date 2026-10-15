using Microservices.Interfaces.Lot;
using Microservices.Services.Lot;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class LotCollection
    {
        public static IServiceCollection AddLotCollection(this IServiceCollection service)
        { 
            service.AddTransient<ILotManagementService, LotJoinService>();
            service.AddTransient<IInventoryInspectionService, InventoryInspectionService>();
            return service;
        }
    }
} 