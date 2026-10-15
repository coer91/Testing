using HWMX.DotNet; 
using Setup;

/* Builder Configuration */
var builder = WebApplication.CreateBuilder(args); 
builder.Services.AddSetupCollection(); 
builder.Services.AddDBConnection(builder.Configuration); 
builder.Services.AddHWMENMESCollection();
builder.Services.AddMicroserviceCollection(); 

//Security 
Security security = new(builder);

security.AddSwagger("PDA")
    .SetSecurityDefinitionBearer(true)
    .SetGroups(["Change", "Defect", "Delivery", "Location", "Lot", "Product", "Recycle", "Shortage", "Store"])
    .Build();

security.AddAuthenticationBearer().Build();
security.AddCors().Build();
security.AddLogger();
security.AddControllers();
security.Run(); 