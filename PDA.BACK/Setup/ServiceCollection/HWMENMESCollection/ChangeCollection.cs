using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Change;
using Repositories.Repository.Change;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class ChangeCollection
    {
        public static IServiceCollection AddChangeCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IInspectionReturnRepository, InspectionReturnRepository>();
            repository.AddTransient<IVendorReturnRepository, VendorReturnRepository>();
            return repository;
        }
    }
} 