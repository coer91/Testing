using Microservices.Interfaces.Lot;
using Repositories.Interfaces.Lot;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM; 
using HWMX.DotNet;

namespace Microservices.Services.Lot
{
    public class TracePublishService(ITracePublishRepository _repository, IHttpContextAccessor _httpContext) : ITracePublishService
    {
    }
} 