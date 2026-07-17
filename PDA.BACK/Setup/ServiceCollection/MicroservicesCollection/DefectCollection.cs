using Microservices.Interfaces.Defect;
using Microservices.Services.Defect;
using Microsoft.Extensions.DependencyInjection;  

namespace Setup.ServiceCollection.MicroservicesCollection
{
    public static class DefectCollection
    {
        public static IServiceCollection AddDefectCollection(this IServiceCollection service)
        {
            service.AddTransient<IDcRegistScrapService, DcRegistScrapService>();
            service.AddTransient<IMaterialDefectService, MaterialDefectService>();
            service.AddTransient<IMaterialInputService, MaterialInputService>();
            service.AddTransient<IMaterialOutputService, MaterialOutputService>();
            service.AddTransient<IOperDefectRegService, OperDefectRegService>();
            service.AddTransient<IQcIngotJudgementService, QcIngotJudgementService>();
            service.AddTransient<IReimpregnationService, ReimpregnationService>();
            service.AddTransient<IReworkApprovalService, ReworkApprovalService>();
            service.AddTransient<IReworkJudgementService, ReworkJudgementService>();
            service.AddTransient<IScrapAreaLotSplitService, ScrapAreaLotSplitService>();
            return service;
        }
    }
}