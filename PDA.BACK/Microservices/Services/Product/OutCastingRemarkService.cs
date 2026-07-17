using Microservices.Interfaces.Product;
using Repositories.Interfaces.Product;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Product
{
    public class OutCastingRemarkService(IOutCastingRemarkRepository _repository, IHttpContextAccessor _httpContext) : IOutCastingRemarkService
    {
    }
} 