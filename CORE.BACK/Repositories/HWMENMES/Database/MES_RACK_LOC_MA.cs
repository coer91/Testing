using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// Rack Loaction
    /// </summary>
    [Table("MES_RACK_LOC_MA", Schema = "MESADMIN")]
    public class MES_RACK_LOC_MA
    {
        public string LOC_NO { get; set; }
        public string RACK_TYPE1 { get; set; }
        public string RACK_TYPE2 { get; set; }
        public string RACK_NO { get; set; }
        public int? ROW_NO { get; set; }
        public int? COL_NO { get; set; }
        public int? MAX_WEIGHT { get; set; }
        public string CHANNEL { get; set; }
        public string DEVICE { get; set; }
        public string ADDR_CALL { get; set; }
        public string ADDR_EMPTY { get; set; }
        public string RW_TYPE { get; set; }
        public string RW_DATA_TYPE { get; set; }
        public string PLC_TYPE { get; set; }
        public string BIT_POS { get; set; }
        public string INPUTDATE { get; set; }
    }
}