using Microservices.Interfaces.Shortage;
using Repositories.Interfaces.Shortage;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Shortage
{
    public class ShortageListService(IShortageListRepository _repository, IHttpContextAccessor _httpContext) : IShortageListService
    {
    }
} 