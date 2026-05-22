namespace Microservices.DTOs
{
    public class StorageDTO
    {
        public string Code { get; set; } 
        public string Name { get; set; }
        public string ERPWerks { get; set; }
        public string ERPCode { get; set; }
        public string Type { get; set; }
        public string Factory { get; set; }
        public int Sequence { get; set; }
        public bool IsActive { get; set; }
    }
} 