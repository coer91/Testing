using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Store;

namespace Repositories.Repository.Store
{
    public class ManualStockInRepository(HWMENMESContext _context) : IManualStockInRepository
    {
        public async Task<ResponseProcedure> SetManualIn(string lotNumber, string partNumber, string qty, string unit, string prodDate, string eoNumber, string vendorId, string warehouse, string model, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_IT")
               .Procedure("SET_MANUAL_IN")
               .Input("P_LOT_NO"     , OracleDbType.Varchar2, lotNumber )
               .Input("P_PART_NO"    , OracleDbType.Varchar2, partNumber)
               .Input("P_QTY"        , OracleDbType.Varchar2, qty       )
               .Input("P_UNIT"       , OracleDbType.Varchar2, unit      )
               .Input("P_PROD_DATE"  , OracleDbType.Varchar2, prodDate  )
               .Input("P_EO_NO"      , OracleDbType.Varchar2, eoNumber  )
               .Input("P_VD_CD"      , OracleDbType.Varchar2, vendorId  )
               .Input("P_WH_CD"      , OracleDbType.Varchar2, warehouse )
               .Input("P_MODEL"      , OracleDbType.Varchar2, model     )
               .Input("P_USER_ID"    , OracleDbType.Varchar2, user      ) 
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 