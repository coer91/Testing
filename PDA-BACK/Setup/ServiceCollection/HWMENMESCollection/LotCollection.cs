using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Lot;
using Repositories.Repository.Lot;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class LotCollection
    {
        public static IServiceCollection AddLotCollection(this IServiceCollection repository)
        { 
            repository.AddTransient<ILotManagementRepository, LotManagementRepository>();
            repository.AddTransient<IInventoryInspectionRepository, InventoryInspectionRepository>();
            return repository;
        }
    }
} 