using HWMX.DotNet;
using Setup;

/* Builder Configuration */
var builder = WebApplication.CreateBuilder(args);

//Dependency Injection  
builder.Services.AddSetupCollection();
builder.Services.AddDBConnection(builder.Configuration); 
builder.Services.AddHWMXCoreCollection();
builder.Services.AddMicroserviceCollection(); 

//Security 
Security security = new(builder);

security.AddSwagger("Core")
    .SetSecurityDefinitionBearer(true)
    .Build();

security.AddAuthenticationBearer().Build();
security.AddCors().Build();
security.AddLogger(true);
security.AddControllers();
security.Run();