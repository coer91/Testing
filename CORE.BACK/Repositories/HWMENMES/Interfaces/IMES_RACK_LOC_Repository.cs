using Repositories.HWMENMES.Database;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Interfaces
{
    public interface IMES_RACK_LOC_Repository
    {
        Task<MES_RACK_LOC_MA> GetRackLocationBy(Expression<Func<MES_RACK_LOC_MA, bool>> expression);
        Task<List<MES_RACK_LOC_MA>> GetRackLocationList(Expression<Func<MES_RACK_LOC_MA, bool>> expression);
    }
} 