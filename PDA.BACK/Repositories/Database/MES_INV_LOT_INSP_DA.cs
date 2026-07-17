using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Database
{
    [Table("MES_INV_LOT_INSP_DA", Schema = "MESADMIN")]
    public class MES_INV_LOT_INSP_DA
    {
        public string INSP_NO { get; set; }
        public string STORAGE_CODE { get; set; }
        public string INSP_DATE { get; set; }
        public string APPLY_FLAG { get; set; }
        public string INPUTUSER { get; set; }
    }
}