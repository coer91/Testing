using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location; 

namespace Repositories.Repository.Location
{
    public class MoveMaterialRepository(HWMENMESContext _context) : IMoveMaterialRepository
    {
        public async Task<ResponseProcedure> GetIssueReq(string issueNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("GET_ISSUE_REQ")
               .Input("P_ISSUE_NO", OracleDbType.Varchar2, issueNumber) 
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> GetMaterialFIFO(string lotNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("GET_MATERIAL_FIFO")
               .Input("P_LOT_NO", OracleDbType.Varchar2, lotNumber)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        } 
                

        public async Task<ResponseProcedure> MoveMaterialList(string issueNumber, string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("MOVE_MATERIAL_LIST")
               .Input("P_ISSUE_NO", OracleDbType.Varchar2, issueNumber)
               .Input("P_LOT_NO", "ARR_VALUE", lotNumberList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user) 
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
}