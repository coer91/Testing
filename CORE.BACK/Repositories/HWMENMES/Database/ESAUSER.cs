using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// USERS
    /// </summary>
    [Table("ESAUSER", Schema = "MESADMIN")]
    public class ESAUSER
    {
        public string SYS_ID { get; set; }
        public string USR_ID { get; set; }
        public string USR_NM { get; set; }
        public string USR_EN_NM { get; set; }
        //public string USR_CLS { get; set; }
        //public string JOB_ROLE { get; set; }
        //public string JOB_CD { get; set; }
        //public string POS_CD { get; set; }
        public string EMP_NO { get; set; }
        public string COMP_CD { get; set; }
        //public string PLT_CD { get; set; }
        public string DEPT_CD { get; set; }
        public int? VD_SN { get; set; }
        public string USE_YN { get; set; }
        public string MOBILE_NO { get; set; }
        public string PHONE_NO { get; set; }
        //public string FAX_NO { get; set; }
        public string EMAIL { get; set; }
        //PW
        //PW_MOD_DT 
        //public string REM { get; set; } 
        public string STS { get; set; }
        public string REG_ID { get; set; }
        //public DateTimeOffset? REG_DT { get; set; }
        public string MOD_ID { get; set; }
        //public DateTimeOffset? MOD_DT { get; set; } 
        public string EFLAG { get; set; }
        //public string EDATE { get; set; }
        //public string ETIME { get; set; }
        //public string WG_CD { get; set; }
        //public string JOB_CONT { get; set; }
        //public int? JOB_SORT { get; set; }
        //public string SECURITY_YN { get; set; }
        //public string LAST_LOGIN_IP { get; set; }
        //public DateTimeOffset? LAST_LOGIN_DT { get; set; }
        //public string PJT_CD { get; set; }
        //public string PDA_F { get; set; }
        public string USR_STATUS { get; set; }
        //public string DEPT_NM { get; set; }
        //public string POS_NM { get; set; }
        public string FACTORY { get; set; }

    }
}