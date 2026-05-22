using Microsoft.Extensions.DependencyInjection;
using Repositories.HWMENMES.Interfaces;
using Repositories.HWMENMES.Repository; 

namespace Setup
{
    public static class HWMENMESCollection
    {
        public static IServiceCollection AddHWMENMESCollection(this IServiceCollection repository)
        {
            repository.AddTransient<IESAAUMM_Repository, ESAAUMM_Repository>();
            repository.AddTransient<IESAAURF_Repository, ESAAURF_Repository>();
            repository.AddTransient<IESAAURP_Repository, ESAAURP_Repository>();
            repository.AddTransient<IESAUSER_Repository, ESAUSER_Repository>();
            repository.AddTransient<IESFRSLN_Repository, ESFRSLN_Repository>();
            repository.AddTransient<IMES_RACK_LOC_PART_MA_Repository, MES_RACK_LOC_PART_MA_Repository>();
            repository.AddTransient<IMES_RACK_LOC_Repository, MES_RACK_LOC_Repository>();
            repository.AddTransient<IMES_STORAGE_MA_Repository, MES_STORAGE_MA_Repository>();
            repository.AddTransient<IPDA_Repository, PDA_Repository>();  
            return repository;
        }        
    }
}
