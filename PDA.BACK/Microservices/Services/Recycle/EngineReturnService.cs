using Microservices.Interfaces.Recycle;
using Repositories.Interfaces.Recycle;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Recycle
{
    public class EngineReturnService(IEngineReturnRepository _repository, IHttpContextAccessor _httpContext) : IEngineReturnService
    {
    }
} 