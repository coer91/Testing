using HWMX.DotNet;
using Setup;

/* Builder Configuration */
var builder = WebApplication.CreateBuilder(args);

//Dependency Injection  
builder.Services.AddSetupCollection();
builder.Services.AddDBConnection(builder.Configuration); 
builder.Services.AddHWMXCoreCollection();
builder.Services.AddHWMENMESCollection();
builder.Services.AddMicroserviceCollection(); 

//Security 
Security security = new(builder);
security.AddSwagger("Core").Build();
security.AddAuthenticationBearer().SetToControllers().Build();
security.AddCors().Build();
security.AddLogger(true);
security.AddControllers();
security.Run();