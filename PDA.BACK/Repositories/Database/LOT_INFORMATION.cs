using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.Database
{
    [Table("VIEW_LOT_INFORMATION", Schema = "MESADMIN")]
    public class LOT_INFORMATION
    {
        public string LOT_NUMBER { get; set; }
        public string PART_NUMBER { get; set; }
        public string PART_NAME { get; set; }
        public string EO_NUMBER { get; set; }
        public string QTY { get; set; }
        public string UNIT { get; set; }
        public string STORAGE_CODE { get; set; }
        public string STORAGE { get; set; }
        public string LOCATION { get; set; }
        public string CASE_LABEL_ID { get; set; }
        public string VENDOR_CODE { get; set; }
        public string VENDOR { get; set; }
        public string INPUT_DATE { get; set; }
        public string PRODUCTION_DATE { get; set; }
        public string HAS_DEFECT { get; set; }
        public string HAS_INSPECTION { get; set; }
        public string HAS_EO { get; set; }
        public string IS_DELETED { get; set; }
    }
}