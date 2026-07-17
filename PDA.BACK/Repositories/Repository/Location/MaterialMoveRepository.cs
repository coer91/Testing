using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location; 

namespace Repositories.Repository.Location
{
    public class MaterialMoveRepository(HWMENMESContext _context) : IMaterialMoveRepository
    {
        public async Task<ResponseProcedure> GetMaterialByIssue(string issueNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_LM")
               .Procedure("GET_ISSUE_REQ_LIST")
               .Input("P_ISSUE_NO", OracleDbType.Varchar2, issueNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetMaterialFIFO(string lotNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_FIFO_INFO_NEW")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetLotFIFO(string partNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_SM")
               .Procedure("GET_SHORTAGE_LOT_INFO")
               .Input("P_PART_NO", OracleDbType.Varchar2, partNumber)
               .Input("P_LANGUAGE", OracleDbType.Varchar2, string.Empty)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> MoveMaterial(string issueNumber, string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_LM")
               .Procedure("SET_LOT_MOVE_MULTI")
               .Input("P_ISSUE_NO", OracleDbType.Varchar2, issueNumber)
               .Input("P_LOT_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 