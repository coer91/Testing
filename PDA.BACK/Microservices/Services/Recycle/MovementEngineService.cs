using Microservices.Interfaces.Recycle;
using Repositories.Interfaces.Recycle;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Recycle
{
    public class MovementEngineService(IMovementEngineRepository _repository, IHttpContextAccessor _httpContext) : IMovementEngineService
    {
    }
} 