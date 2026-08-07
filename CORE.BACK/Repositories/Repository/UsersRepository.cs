using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
using Repositories.Interfaces;
using System.Linq.Expressions;
using Repositories.Database;
using HWMX.DotNet.ORM;

namespace Repositories.Repository
{
    public class UsersRepository(HWMXCoreContext _context, IConfiguration _configuration) : IUsersRepository
    {
        public async Task<ResponseProcedure> Login(string user, string password)
        {
            string connectionString = _configuration.GetConnectionString("HWMENMES");

            return await Procedure
                .Oracle(connectionString)
                .Package("PKG_HWMX_MASTER")
                .Procedure("LOGIN")
                .Input("P_USER", OracleDbType.Varchar2, user)
                .Input("P_USER_PW", OracleDbType.Varchar2, password)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetUserOracle(string user)
        {
            string connectionString = _configuration.GetConnectionString("HWMENMES");

            return await Procedure
                .Oracle(connectionString)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_USER")
                .Input("P_USER", OracleDbType.Varchar2, user)
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<ResponseProcedure> GetUserListOracle(string departmentCode, bool onlyActive = true)
        {
            string connectionString = _configuration.GetConnectionString("HWMENMES");

            return await Procedure
                .Oracle(connectionString)
                .Package("PKG_HWMX_MASTER")
                .Procedure("GET_USER_LIST")
                .Input("P_DEPT_CD", OracleDbType.Varchar2, departmentCode)
                .Input("P_ONLY_ACTIVE", OracleDbType.Varchar2, onlyActive ? "Y" : "N")
                .Output("IO_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }


        public async Task<bool> ExistsUser(Expression<Func<TblUser, bool>> expression)
        {
            return await _context.TblUsers
                .AsNoTracking()
                .AnyAsync(expression);
        }


        public async Task<TblUser> GetUserBy(Expression<Func<TblUser, bool>> expression)
        {
            return await _context.TblUsers 
                .Include(x => x.Partner)
                .Include(x => x.TblUsersRoles).ThenInclude(x => x.Role)
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
        }


        public async Task<List<TblUser>> GetUserList(Expression<Func<TblUser, bool>> expression)
        {
            return await _context.TblUsers 
                .Include(x => x.Partner)
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<TblUser> CreateUser(TblUser entity)
        {
            await _context.TblUsers.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }


        public async Task<TblUser> UpdateUser(TblUser entity)
        {
            _context.TblUsers.Update(entity); 
            await _context.SaveChangesAsync();
            return entity;
        } 
    }
}