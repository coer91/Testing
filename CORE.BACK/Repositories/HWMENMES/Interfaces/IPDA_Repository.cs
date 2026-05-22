using HWMX.DotNet.ORM;

namespace Repositories.HWMENMES.Interfaces
{
    public interface IPDA_Repository
    {
        public Task<ResponseProcedure> GET_LOGIN_INFO(string user, string password);
    }
}