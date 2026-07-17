using Microsoft.Extensions.DependencyInjection;
using Repositories.Interfaces.Product;
using Repositories.Repository.Product;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class ProductCollection
    {
        public static IServiceCollection AddProductCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IDiecastPalletizeHistoryRepository, DiecastPalletizeHistoryRepository>();
            repository.AddTransient<IDiecastProductHistoryRepository, DiecastProductHistoryRepository>();
            repository.AddTransient<IInCastingRemarkRepository, InCastingRemarkRepository>();
            repository.AddTransient<IIrregularRemarkRepository, IrregularRemarkRepository>();
            repository.AddTransient<IOutCastingRemarkRepository, OutCastingRemarkRepository>();
            repository.AddTransient<IThreeCBufferHistoryRepository, ThreeCBufferHistoryRepository>();
            return repository;
        }
    }
} 