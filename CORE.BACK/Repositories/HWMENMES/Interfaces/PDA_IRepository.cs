using HWMX.DotNet.ORM;

namespace Repositories.HWMENMES.Interfaces
{
    public interface PDA_IRepository
    {
        public Task<ResponseProcedure> GET_LOGIN_INFO(string user, string password);
    }
}