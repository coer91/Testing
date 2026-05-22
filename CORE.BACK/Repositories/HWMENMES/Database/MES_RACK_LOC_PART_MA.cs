using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// Rack Location Part No
    /// </summary>
    [Table("MES_RACK_LOC_PART_MA", Schema = "MESADMIN")]
    public class MES_RACK_LOC_PART_MA
    {
        public string LOC_NO { get; set; }
        public string PART_NO { get; set; }
        public int? MAX_QTY { get; set; }
        public string INPUTDATE { get; set; }
        public string INPUTUSER { get; set; }
        public string UPDATEDATE { get; set; }
        public string UPDATEUSER { get; set; }
    }
}
