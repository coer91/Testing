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
            repository.AddDeliveryCollection();
            repository.AddLocationCollection();
            repository.AddLotCollection();
            repository.AddStoreCollection();
            repository.AddTransient<IMasterRepository, MasterRepository>();
            return repository;
        }
    }
}
