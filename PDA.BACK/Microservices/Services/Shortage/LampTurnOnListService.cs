using Microservices.Interfaces.Shortage;
using Repositories.Interfaces.Shortage;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Shortage
{
    public class LampTurnOnListService(ILampTurnOnListRepository _repository, IHttpContextAccessor _httpContext) : ILampTurnOnListService
    {
    }
} 