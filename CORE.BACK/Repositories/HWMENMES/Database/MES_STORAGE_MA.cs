using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.HWMENMES.Database
{ 
    [Table("MES_STORAGE_MA", Schema = "MESADMIN")]
    public class MES_STORAGE_MA
    {
        public string STORAGE_CODE { get; set; }
        public string STORAGE_NAME_KR { get; set; }
        public string STORAGE_NAME_LC { get; set; }
        public string STORAGE_NAME_EN { get; set; }
        public string ERP_WERKS { get; set; }
        public string ERP_CODE { get; set; }
        public string STORAGE_TYPE { get; set; }
        public string FACTORY { get; set; }
        public string ORDER_SEQ { get; set; }
        public string USE_FLAG { get; set; }
        public string INPUTDATE { get; set; }
        public string INPUTUSER { get; set; }
        public string UPDATEDATE { get; set; }
        public string UPDATEUSER { get; set; } 
    }
} 