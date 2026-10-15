using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Database;
using System.Linq.Expressions;

namespace Repositories.Repository
{
	public class UsersImageRepository(HWMXCoreContext _context) : IUsersImageRepository
	{

		public async Task<TblUsersImage> GetUserImageBy(Expression<Func<TblUsersImage, bool>> expression)
		{
			return await _context.TblUsersImages
				.AsNoTracking()
				.FirstOrDefaultAsync(expression);
		}


		public async Task<TblUsersImage> CreateUserImage(TblUsersImage entity)
		{
			await _context.TblUsersImages.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


		public async Task<TblUsersImage> UpdateUserImage(TblUsersImage entity)
		{
			_context.TblUsersImages.Update(entity);
			await _context.SaveChangesAsync();
			return entity;
		}


        public async Task<int> DeleteUserImage(TblUsersImage entity)
        {
            _context.TblUsersImages.Remove(entity);
            int rows = await _context.SaveChangesAsync();
            _context.ChangeTracker.Clear();
            return rows;
        }
	}
}