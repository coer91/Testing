using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Store; 

namespace Repositories.Repository.Store
{
    public class ContainerRepository(HWMENMESContext _context) : IContainerRepository
    {
        public async Task<ResponseProcedure> GetContainerDownload(string orderNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("GET_CONTAINER_DOWNLOAD")
               .Input("P_ORD_NO", OracleDbType.Varchar2, orderNumber)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        }


        public async Task<ResponseProcedure> SetContainerDownload(string orderNumber, string[] caseLabelList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_CONTAINER_DOWNLOAD")
               .Input("P_ORD_NO", OracleDbType.Varchar2, orderNumber)
               .Input("P_CASE_LABEL_ID", "ARR_VALUE", caseLabelList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }


        public async Task<ResponseProcedure> GetContainerLoad(string orderNumber)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("GET_CONTAINER_LOAD")
               .Input("P_ORD_NO", OracleDbType.Varchar2, orderNumber)
               .Output("IO_CURSOR", OracleDbType.RefCursor)
               .Exec();
        } 


        public async Task<ResponseProcedure> SetContainerLoad(string orderNumber, string[] caseLabelList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("SET_CONTAINER_LOAD")
               .Input("P_ORD_NO", OracleDbType.Varchar2, orderNumber)
               .Input("P_CASE_LABEL_ID", "ARR_VALUE", caseLabelList)
               .Input("P_USER_ID", OracleDbType.Varchar2, user)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }  


        public async Task<ResponseProcedure> CheckContainerOrder(string orderNumber, string caseLabel)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_STORE")
               .Procedure("CHECK_CONTAINER_ORDER")
               .Input("P_ORD_NO", OracleDbType.Varchar2, orderNumber)
               .Input("P_CASE_LABEL_ID", OracleDbType.Varchar2, caseLabel)
               .Output("IO_MESSAGE", OracleDbType.Varchar2)
               .Exec();
        }
    }
} 