namespace Repositories.Database
{
    public class TROLLY_ORDER_DTO
    {
        public string PRODUCTION_DATE { get; set; }
        public int PLAN_SEQUENCE { get; set; }
        public string PART_NUMBER { get; set; }  
        public string TROLLY_GROUP { get; set; }
        public int QTY { get; set; }
        public int MAX_QTY { get; set; }
    }
}
