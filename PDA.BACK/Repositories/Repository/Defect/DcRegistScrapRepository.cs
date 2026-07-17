using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect; 
namespace Repositories.Repository.Defect
{
    public class DcRegistScrapRepository(HWMENMESContext _context) : IDcRegistScrapRepository
    {
        public async Task<ResponseProcedure> GetDieScrapSerial(string serial)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_DC_SCRAP_SERIAL")
               .Input("P_MAT_SERIAL_NO", OracleDbType.Varchar2, serial)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }

        public async Task<ResponseProcedure> SetDCStocktaking(List<string> serialList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_WIP_PALLET")
               .Procedure("SET_DC_SCRAP_SAV")
               .Input("P_MAT_SERIAL_NO", OracleDbType.Array, serialList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }

    }
} 