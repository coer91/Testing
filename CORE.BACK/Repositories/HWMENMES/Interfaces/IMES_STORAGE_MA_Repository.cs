using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using System.Linq.Expressions;

namespace Repositories.HWMENMES.Interfaces
{
    public interface IMES_STORAGE_MA_Repository
    {
        Task<MES_STORAGE_MA> GetStorageBy(Expression<Func<MES_STORAGE_MA, bool>> expression);
        Task<List<MES_STORAGE_MA>> GetStorageList(Expression<Func<MES_STORAGE_MA, bool>> expression);
    }
} 