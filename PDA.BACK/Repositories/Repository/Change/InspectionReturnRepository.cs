using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Change; 

namespace Repositories.Repository.Change
{
    public class InspectionReturnRepository(HWMENMESContext _context) : IInspectionReturnRepository
    {
        public async Task<ResponseProcedure> SetRetTransferVD(string LotNo, string UserId)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("SET_RET_TRANSFER_VD")
               .Input("P_LOT_NO", OracleDbType.Varchar2, LotNo)
               .Input("P_USER_ID", OracleDbType.Varchar2, UserId)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 