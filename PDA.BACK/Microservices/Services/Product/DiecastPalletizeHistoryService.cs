using Microservices.Interfaces.Product;
using Repositories.Interfaces.Product;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Product
{
    public class DiecastPalletizeHistoryService(IDiecastPalletizeHistoryRepository _repository, IHttpContextAccessor _httpContext) : IDiecastPalletizeHistoryService
    {
    }
} 