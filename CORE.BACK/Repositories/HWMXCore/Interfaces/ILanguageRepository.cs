using Repositories.HWMXCore.Database;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Interfaces
{
	public interface ILanguageRepository
	{
		Task<bool> ExistsLanguage(Expression<Func<TblLanguage, bool>> expression);
		Task<TblLanguage> GetLanguageBy(Expression<Func<TblLanguage, bool>> expression);
		Task<List<TblLanguage>> GetLanguageList(Expression<Func<TblLanguage, bool>> expression);
		Task<TblLanguage> CreateLanguage(TblLanguage entity);
		Task<TblLanguage> UpdateLanguage(TblLanguage entity);
		Task<int> DeleteLanguage(TblLanguage entity);
	}
}