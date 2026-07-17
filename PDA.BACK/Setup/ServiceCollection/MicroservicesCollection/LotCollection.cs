using Microservices.Interfaces.Lot;
using Microservices.Services.Lot;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class LotCollection
    {
        public static IServiceCollection AddLotCollection(this IServiceCollection service)
        { 
            service.AddTransient<IMergeLabelService, MergeLabelService>();
            service.AddTransient<IMergeService, MergeService>();
            service.AddTransient<IRepublishService, RepublishService>();
            service.AddTransient<ISplitService, SplitService>();
            service.AddTransient<IInventoryInspectionService, InventoryInspectionService>();
            service.AddTransient<ITracePublishService, TracePublishService>();
            return service;
        }
    }
} 