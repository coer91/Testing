using System.ComponentModel.DataAnnotations.Schema; 

namespace Repositories.HWMENMES.Database
{
    /// <summary>
    /// TRANSLATE
    /// </summary>
    [Table("ESFRSLN", Schema = "MESADMIN")]
    public class ESFRSLN
    { 
        public string SYS_ID { get; set; }
        public string ORIGIN { get; set; }
        public string BUNDLE_NAME { get; set; }
        public string LOCALE { get; set; }
        public string TRANSLATED { get; set; }
        public string USE_YN { get; set; }
        public string DEL_YN { get; set; }
        public string COMMENTS { get; set; }
        public string LEGACY { get; set; }
    } 
} 