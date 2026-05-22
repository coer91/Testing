using Repositories.HWMENMES.Database;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Interfaces
{
    public interface IMES_RACK_LOC_PART_MA_Repository
    {
        Task<List<MES_RACK_LOC_PART_MA>> GetRackLocationPartNoList(Expression<Func<MES_RACK_LOC_PART_MA, bool>> expression);
    }
}
