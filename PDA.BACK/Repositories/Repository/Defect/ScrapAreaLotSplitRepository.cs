using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Defect;

namespace Repositories.Repository.Defect
{
    public class ScrapAreaLotSplitRepository(HWMENMESContext _context) : IScrapAreaLotSplitRepository
    {
        public async Task<ResponseProcedure> GetScrapAreaLotInfo(string LotNo)
        {
            return await Procedure
                .Oracle(_context)
                .Package("PKG_MES_PDA_QM")
                .Procedure("GET_LOT_SCRAP_AREA_INFO")
                .Input("P_LOT_NO", OracleDbType.Varchar2, LotNo)
                .Output("P_CURSOR", OracleDbType.RefCursor)
                .Exec();
        }
    }
} 