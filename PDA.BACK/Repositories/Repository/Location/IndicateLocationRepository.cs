using HWMX.DotNet.ORM;
using Oracle.ManagedDataAccess.Client;
using Repositories.Database;
using Repositories.Interfaces.Location;

namespace Repositories.Repository.Location
{
    public class IndicateLocationRepository(HWMENMESContext _context) : IIndicateLocationRepository
    {
        public async Task<ResponseProcedure> GetCaseLabelLocation(string caseLabel)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_MES_PDA")
               .Procedure("GET_CASE_LOT_INFO_LOC")
               .Input("P_CASE_LABEL_ID", OracleDbType.Varchar2, caseLabel)
               .Output("P_CURSOR",       OracleDbType.RefCursor)
               .Exec();
        } 


        //public async Task<ResponseProcedure> PartNumberLocationMatching(string location, string partNumber)
        //{
        //    return await Procedure
        //       .Oracle(_context)
        //       .Package("PKG_MES_PDA")
        //       .Procedure("GET_LOC_PART_MATCHING")
        //       .Input("P_LOC_NO",      OracleDbType.Varchar2, location)
        //       .Input("P_PART_NO",     OracleDbType.Varchar2, partNumber)
        //       .Output("P_RETURN_MSG", OracleDbType.Varchar2)
        //       .Exec();
        //}


        public async Task<ResponseProcedure> GetMaterialByLocation(string location)
        {
            return await Procedure
              .Oracle(_context)
              .Package("PKG_MES_PDA")
              .Procedure("GET_MATERIAL_BY_LOCATION")
              .Input("P_LOCATION", OracleDbType.Varchar2, location)
              .Output("P_CURSOR", OracleDbType.RefCursor)
              .Exec();
        }


        public async Task<ResponseProcedure> SetLotsInLocation(string storageCode, string location, string[] lotNumberList, string user)
        {
            return await Procedure
               .Oracle(_context)
               .Package("PKG_HWMX_PDA_LOCATION")
               .Procedure("SET_LOTS_IN_LOCATION") 
               .Input("P_LOT_NO",       "ARR_VALUE",           lotNumberList)
               .Input("P_STORAGE_CODE", OracleDbType.Varchar2, storageCode)
               .Input("P_LOC_NO",       OracleDbType.Varchar2, location)
               .Input("P_USER_ID",      OracleDbType.Varchar2, user)
               .Output("P_RETURN_MSG",  OracleDbType.Varchar2)
               .Exec();
        } 
    }
} 