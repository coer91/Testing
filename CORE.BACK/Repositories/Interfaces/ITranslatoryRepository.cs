using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Interfaces
{
    public interface ITranslatoryRepository
    {
        Task<bool> ExistsTranslatory(Expression<Func<TblTranslatory, bool>> expression);
        Task<TblTranslatory> GetTranslatoryBy(Expression<Func<TblTranslatory, bool>> expression); 
        Task<TblTranslatory> CreateTranslatory(TblTranslatory entity); 
        Task<TblTranslatory> UpdateTranslatory(TblTranslatory entity);
        Task<int> DeleteTranslatory(TblTranslatory entity);
    }
}
