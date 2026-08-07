using Microsoft.Extensions.DependencyInjection; 
using Repositories.Interfaces.Delivery;
using Repositories.Repository.Delivery;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class DeliveryCollection
    {
        public static IServiceCollection AddDeliveryCollection(this IServiceCollection repository)
        {
            repository.AddTransient<ICcDeliveryRepository, CcDeliveryRepository>();
            repository.AddTransient<IPermitGateRepository, PermitGateRepository>();
            return repository;
        }
    }
}