using Microservices.Interfaces.Lot;
using Repositories.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Lot
{
    public class RepublishService(IRepublishRepository _repository, IHttpContextAccessor _httpContext) : IRepublishService
    {
    }
} 