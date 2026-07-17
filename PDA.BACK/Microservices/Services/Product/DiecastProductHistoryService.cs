using Microservices.Interfaces.Product;
using Repositories.Interfaces.Product;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Product
{
    public class DiecastProductHistoryService(IDiecastProductHistoryRepository _repository, IHttpContextAccessor _httpContext) : IDiecastProductHistoryService
    {
    }
} 