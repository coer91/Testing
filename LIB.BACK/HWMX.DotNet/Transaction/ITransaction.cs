using Microsoft.EntityFrameworkCore; 

namespace HWMX.DotNet
{
    public interface ITransaction<T> where T : DbContext
    {
        Task BeginTransaction();
        Task CommitTransaction();
        Task RollbackTransaction();
        void ClearTracker();
    }
} 