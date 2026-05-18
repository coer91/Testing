using Microsoft.EntityFrameworkCore;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Database;
using System.Linq.Expressions;

namespace Repositories.HWMXCore.Repository
{
	public class LanguageRepository(HWMXCoreContext _context) : ILanguageRepository
	{

		public async Task<bool> ExistsLanguage(Expression<Func<TblLanguage, bool>> expression)
		{
			return await _context.TblLanguages
				.AsNoTracking()
				.AnyAsync(expression);
		}


		public async Task<TblLanguage> GetLanguageBy(Expression<Func<TblLanguage, bool>> expression)
		{
			return await _context.TblLanguages
				.AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblLanguage>> GetLanguageList(Expression<Func<TblLanguage, bool>> expression)
		{
			return await _context.TblLanguages
				.Where(expression)
				.AsNoTracking()
				.ToListAsync();
		}


		public async Task<TblLanguage> CreateLanguage(TblLanguage entity)
		{
			await _context.TblLanguages.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<TblLanguage> UpdateLanguage(TblLanguage entity)
		{
			_context.TblLanguages.Update(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<int> DeleteLanguage(TblLanguage entity)
		{
			_context.TblLanguages.Remove(entity);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}
	}
}