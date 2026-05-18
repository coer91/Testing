using Microsoft.AspNetCore.Hosting; 
using HWMX.DotNet;

await Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) => services.AddHostedService<ScaffoldService>())
    .Build()
    .RunAsync(); 

public class ScaffoldService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        => await new Scaffold().SetDatabases(["HWMXCore"]).Build();
}