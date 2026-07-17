using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces;
using Repositories.Repository;
using Setup.ServiceCollection.HWMENMESCollection;

namespace Setup
{
    public static class HWMENMESCollection
    {     
        public static IServiceCollection AddHWMENMESCollection(this IServiceCollection repository)
        { 
            repository.AddChangeCollection();
            repository.AddDefectCollection();
            repository.AddDeliveryCollection();
            repository.AddLocationCollection();
            repository.AddLotCollection();
            repository.AddProductCollection();
            repository.AddRecycleCollection();
            repository.AddShortageCollection();  
            repository.AddStoreCollection();
            repository.AddTransient<IMasterRepository, MasterRepository>();
            return repository;
        }
    }
}
