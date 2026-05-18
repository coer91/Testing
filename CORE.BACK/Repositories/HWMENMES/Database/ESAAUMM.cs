using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// PAGES
    /// </summary>
    [Table("ESAAUMM", Schema = "MESADMIN")]
    public class ESAAUMM
    {
        public string SYS_ID { get; set; }
        public string MENU_CD { get; set; } 
        public string UP_MENU_CD { get; set; }
        public string LINK_URL { get; set; }
        public string USR_CLS { get; set; }
        public string MENU_TYP { get; set; }
        public int? SORT_ORD { get; set; }
        public string USE_YN { get; set; }
        public string REM { get; set; }
        public string STS { get; set; }
        public string REG_ID { get; set; }
        public DateTimeOffset? REG_DT { get; set; }
        public string MOD_ID { get; set; }
        public DateTimeOffset? MOD_DT { get; set; }
        public string MD_CLS { get; set; }
    }
}