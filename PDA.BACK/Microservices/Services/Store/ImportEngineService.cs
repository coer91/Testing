using Microservices.Interfaces.Store;
using Repositories.Interfaces.Store;
using Microsoft.AspNetCore.Http;
using HWMX.DotNet.ORM;
using HWMX.DotNet;

namespace Microservices.Services.Store
{
    public class ImportEngineService(IImportEngineRepository _repository, IHttpContextAccessor _httpContext) : IImportEngineService
    {
    }
} 