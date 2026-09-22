using HWMX.DotNet.ORM;
using Microsoft.AspNetCore.Hosting; 

await Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) => services.AddHostedService<ScaffoldService>())
    .Build()
    .RunAsync(); 

public class ScaffoldService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        => await new Scaffold()
            .SQLServerProfile(new ScaffoldProfile
            {
                ConnectionString = "HWMXCore",
                StartupProject   = "API",
                Project          = "Repositories",
                ContextName      = "HWMXCoreContext",
                ContextNamespace = "Repositories.Database",
                ContextOutput    = "Database",
                OutputFiles = new ScaffoldOutput
                {
                    IRepositoryOutput = "Repositories/Interfaces",
                    RepositoryOutput  = "Repositories/Repository",
                    DtoOutput         = "Microservices/DTOs",
                    AutoMapperOutput  = "Microservices/AutoMappers",
                    IServiceOutput    = "Microservices/Interfaces",
                    ServiceOutput     = "Microservices/Services",
                    ControllerOutput  = "API/Controllers",
                    RepositorySetup   = "Setup/ServiceCollection/HWMXCoreCollection.cs",
                    ServiceSetup      = "Setup/ServiceCollection/MicroservicesCollection.cs"
                }
            }).Build();
}