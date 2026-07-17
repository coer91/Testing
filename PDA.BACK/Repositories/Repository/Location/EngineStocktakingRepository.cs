using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location; 

namespace Repositories.Repository.Location
{
    public class EngineStocktakingRepository(HWMENMESContext _context) : IEngineStocktakingRepository
    {
        public async Task<ResponseProcedure> GetPallet3C(string palletCode)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_LM")
               .Procedure("GET_3C_PALLET_INFO")
               .Input("P_PALLET_CODE", OracleDbType.Varchar2, palletCode) 
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetStocktaking(string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_LM")
               .Procedure("SET_FINAL_STOCKTAKING")
               .Input("P_SERIAL_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 