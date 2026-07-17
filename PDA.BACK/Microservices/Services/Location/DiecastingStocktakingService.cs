using Microservices.Interfaces.Location;
using Repositories.Interfaces.Location;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Location
{
    public class DiecastingStocktakingService(IDiecastingStocktakingRepository _repository, IHttpContextAccessor _httpContext) : IDiecastingStocktakingService
    {
    }
} 