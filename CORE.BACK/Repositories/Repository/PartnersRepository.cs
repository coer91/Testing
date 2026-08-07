using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Repository
{
	public class PartnersRepository(HWMXCoreContext _context) : IPartnersRepository
	{

		public async Task<bool> ExistsPartner(Expression<Func<TblPartner, bool>> expression)
			=> await _context.TblPartners.AsNoTracking().AnyAsync(expression);


		public async Task<TblPartner> GetPartnerBy(Expression<Func<TblPartner, bool>> expression)
		{
			return await _context.TblPartners
				.AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<List<TblPartner>> GetPartnerList(Expression<Func<TblPartner, bool>> expression)
		{
			return await _context.TblPartners
				.Where(expression)
				.AsNoTracking()
				.ToListAsync();
		}


		public async Task<TblPartner> CreatePartner(TblPartner entity)
		{
			await _context.TblPartners.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<TblPartner> UpdatePartner(TblPartner entity)
		{
			_context.TblPartners.Update(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<int> DeletePartner(TblPartner entity)
		{
			_context.TblPartners.Remove(entity);
			int rows = await _context.SaveChangesAsync();
			_context.ChangeTracker.Clear();
			return rows;
		}
	}
}