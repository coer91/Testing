using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Interfaces
{
	public interface IUsersImageRepository
	{
		Task<TblUsersImage> GetUserImageBy(Expression<Func<TblUsersImage, bool>> expression);
		Task<TblUsersImage> CreateUserImage(TblUsersImage entity);
		Task<TblUsersImage> UpdateUserImage(TblUsersImage entity);
		Task<int> DeleteUserImage(TblUsersImage entity);
    }
}