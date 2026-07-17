using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Store; 

namespace Repositories.Repository.Store
{
    public class ContainerRepository(HWMENMESContext _context) : IContainerRepository
    {

        public async Task<ResponseProcedure> GetContainerDownload(string orderNumber, string language)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CY")
               .Procedure("PRC_GET_CONTNR_CALL_INFO")
               .Input("P_ORD_NO" , OracleDbType.Varchar2, orderNumber)
               .Input("P_TYPE"   , OracleDbType.Varchar2, string.Empty)
               .Input("P_LANG"   , OracleDbType.Varchar2, language)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetContainerDownload(string orderNumber, string[] caseLabelList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CY")
               .Procedure("PRC_SET_CONTAINER_DOWNLOAD")
               .Input("P_ORD_NO"       , OracleDbType.Varchar2, orderNumber)
               .Input("P_CASE_LABEL_ID", "ARR_VALUE", caseLabelList)
               .Input("P_USER_ID"      , OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG"  , OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> GetContainerLoad(string orderNumber, string language)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CY")
               .Procedure("PRC_GET_CONTNR_CALL_INFO")
               .Input("P_ORD_NO" , OracleDbType.Varchar2, orderNumber)
               .Input("P_TYPE"   , OracleDbType.Varchar2, "L")
               .Input("P_LANG"   , OracleDbType.Varchar2, language)
               .Output("P_CURSOR", OracleDbType.RefCursor)
               .Exec();
        } 


        public async Task<ResponseProcedure> SetContainerLoad(string orderNumber, string[] caseLabelList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CY")
               .Procedure("PRC_SET_CONTAINER_LOAD")
               .Input("P_ORD_NO"       , OracleDbType.Varchar2, orderNumber)
               .Input("P_CASE_LABEL_ID", "ARR_VALUE", caseLabelList)
               .Input("P_USER_ID"      , OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG"  , OracleDbType.Varchar2)
               .Exec();
        }  


        public async Task<ResponseProcedure> CheckOrder(string orderNumber, string caseLabel)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA_CY")
               .Procedure("PRC_CHECK_CONTNR_ORDER")
               .Input("P_ORD_NO", OracleDbType.Varchar2, orderNumber)
               .Input("P_CASE_LABEL_ID", OracleDbType.Varchar2, caseLabel)
               .Output("P_RETURN_MSG", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 