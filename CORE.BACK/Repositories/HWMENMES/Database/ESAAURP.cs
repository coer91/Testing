using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// USER ROLE
    /// </summary>
    [Table("ESAAURP", Schema = "MESADMIN")]
    public class ESAAURP
    { 
        public string SYS_ID { get; set; }
        public string USR_ID { get; set; } 
        public string ROLE_CD { get; set; }
        public string REM { get; set; }
        public string STS { get; set; }
        public string REG_ID { get; set; }
        public DateTimeOffset? REG_DT { get; set; }
        public string MOD_ID { get; set; }
        public DateTimeOffset? MOD_DT { get; set; }
    }
}