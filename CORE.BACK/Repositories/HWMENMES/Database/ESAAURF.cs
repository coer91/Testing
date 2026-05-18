using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// ROLE PAGE
    /// </summary>
    [Table("ESAAURF", Schema = "MESADMIN")]
    public class ESAAURF
    { 
        public string SYS_ID { get; set; }
        public string ROLE_CD { get; set; } 
        public string FUNC_CD { get; set; }
        public string MENU_CD { get; set; }
        public string REG_ID { get; set; } 
        public string REG_DT { get; set; } 
    }
}