namespace Microservices.DTOs
{
    public class RackLocationDTO
    {
        public string LocationNumber { get; set; }
        public string RackType1 { get; set; }
        public string RackType2 { get; set; }
        public string RackNumber { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public int MaxWeight { get; set; }
        public string Channel { get; set; }
        public string Device { get; set; }
        public string AddrCall { get; set; }
        public string AddrEmpty { get; set; }
        public string RowType { get; set; }
        public string RowDataType { get; set; }
        public string PlcType { get; set; }
        public int BitPos { get; set; }
        public string Date { get; set; }
    }
} 