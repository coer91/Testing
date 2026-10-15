using HWMX.DotNet.ORM; 
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location;
namespace Repositories.Repository.Location
{
    public class EngineStocktakingRepository(HWMENMESContext _context) : IEngineStocktakingRepository
    {

        public async Task<ResponseProcedure> Get3CPalletInfo(string PalletCode)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("GET_3C_PALLET_INFO")
               .Input("P_PALLET_CODE", OracleDbType.Varchar2, PalletCode)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }

        public async Task<ResponseProcedure> SetFinalStocktaking(string[] SerialNoList, string User)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("SET_FINAL_STOCKTAKING")
               .Input("P_SERIAL_NO", "ARR_VALUE", SerialNoList)
               .Input("P_USER_ID", OracleDbType.Varchar2, User)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
}