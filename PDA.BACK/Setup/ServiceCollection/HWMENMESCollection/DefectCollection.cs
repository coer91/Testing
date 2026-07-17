using Microsoft.Extensions.DependencyInjection; 
using Repositories.Interfaces.Defect;
using Repositories.Repository.Defect;

namespace Setup.ServiceCollection.HWMENMESCollection
{
    public static class DefectCollection
    {
        public static IServiceCollection AddDefectCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IDcRegistScrapRepository, DcRegistScrapRepository>();
            repository.AddTransient<IMaterialDefectRepository, MaterialDefectRepository>();
            repository.AddTransient<IMaterialInputRepository, MaterialInputRepository>();
            repository.AddTransient<IMaterialOutputRepository, MaterialOutputRepository>();
            repository.AddTransient<IOperDefectRegRepository, OperDefectRegRepository>();
            repository.AddTransient<IQcIngotJudgementRepository, QcIngotJudgementRepository>();
            repository.AddTransient<IReimpregnationRepository, ReimpregnationRepository>();
            repository.AddTransient<IReworkApprovalRepository, ReworkApprovalRepository>();
            repository.AddTransient<IReworkJudgementRepository, ReworkJudgementRepository>();
            repository.AddTransient<IScrapAreaLotSplitRepository, ScrapAreaLotSplitRepository>();
            return repository;
        }
    }
}