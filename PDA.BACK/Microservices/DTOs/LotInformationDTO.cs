namespace Microservices.DTOs
{
    public class LotInformationDTO  
    {
        public string LotNumber { get; set; }
        public string PartNumber { get; set; }
        public string PartName { get; set; }           
        public string EoNumber { get; set; }
        public int Qty { get; set; }
        public string Unit { get; set; }
        public string StorageCode { get; set; }
        public string Storage { get; set; }
        public string Location { get; set; }
        public string CaseLabelId { get; set; }
        public string VendorCode { get; set; }
        public string Vendor { get; set; }
        public string InputDate { get; set; }
        public string ProductionDate { get; set; }
        public bool HasDefect { get; set; }
        public bool HasInspection { get; set; }
        public bool HasEO { get; set; }
        public bool IsDeleted { get; set; }
    }
} 