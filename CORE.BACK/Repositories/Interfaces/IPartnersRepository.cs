using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Interfaces
{
	public interface IPartnersRepository
	{
		Task<bool> ExistsPartner(Expression<Func<TblPartner, bool>> expression);
		Task<TblPartner> GetPartnerBy(Expression<Func<TblPartner, bool>> expression);
		Task<List<TblPartner>> GetPartnerList(Expression<Func<TblPartner, bool>> expression);
		Task<TblPartner> CreatePartner(TblPartner entity);
		Task<TblPartner> UpdatePartner(TblPartner entity);
		Task<int> DeletePartner(TblPartner entity);
	}
}