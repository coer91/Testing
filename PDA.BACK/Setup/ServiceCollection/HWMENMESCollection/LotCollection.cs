using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Lot;
using Repositories.Repository.Lot;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class LotCollection
    {
        public static IServiceCollection AddLotCollection(this IServiceCollection repository)
        { 
            repository.AddTransient<IMergeLabelRepository, MergeLabelRepository>();
            repository.AddTransient<IMergeRepository, MergeRepository>();
            repository.AddTransient<IRepublishRepository, RepublishRepository>();
            repository.AddTransient<ISplitRepository, SplitRepository>();
            repository.AddTransient<IInventoryInspectionRepository, InventoryInspectionRepository>();
            repository.AddTransient<ITracePublishRepository, TracePublishRepository>();
            return repository;
        }
    }
} 