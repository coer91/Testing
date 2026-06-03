using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// USER ROLE
    /// </summary>
    [Table("MES_DEPT_MA", Schema = "MESADMIN")]
    public class MES_DEPT_MA
    {
        public string ORG_CD { get; set; }
        public string EMP_GRP_CD { get; set; }
        public string EMP_SUBG_CD { get; set; }
        public string DEPT_DESC_EN { get; set; }
        public string CATEGORY { get; set; }
        public string USE_FLAG { get; set; } 
    }
}