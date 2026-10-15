namespace Repositories.Database
{
    public class GLOVIS_ORDER_DTO
    {
        public string ORDER_NUMBER { get; set; }
        public string ORDER_STATUS { get; set; }
        public string TO_STORAGE_CODE { get; set; }
        public int SENT_QTY { get; set; }
        public int RECV_QTY { get; set; }
    }
}
