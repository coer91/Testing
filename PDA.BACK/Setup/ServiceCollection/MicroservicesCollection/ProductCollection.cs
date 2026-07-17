using Microservices.Interfaces.Product;
using Microservices.Services.Product;
using Microsoft.Extensions.DependencyInjection; 

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class ProductCollection
    {
        public static IServiceCollection AddProductCollection(this IServiceCollection service)
        {
            service.AddTransient<IDiecastPalletizeHistoryService, DiecastPalletizeHistoryService>();
            service.AddTransient<IDiecastProductHistoryService, DiecastProductHistoryService>();
            service.AddTransient<IInCastingRemarkService, InCastingRemarkService>();
            service.AddTransient<IIrregularRemarkService, IrregularRemarkService>();
            service.AddTransient<IOutCastingRemarkService, OutCastingRemarkService>();
            service.AddTransient<IThreeCBufferHistoryService, ThreeCBufferHistoryService>();
            return service;
        }
    }
} 