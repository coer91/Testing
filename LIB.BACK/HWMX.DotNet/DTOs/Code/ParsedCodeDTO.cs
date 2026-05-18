namespace HWMX.DotNet
{
    public class ParsedCodeDTO
    {
        public string Plant        { get; set; } //Plant
        public string Company      { get; set; } //Vdcd
        public string PartNumber   { get; set; } //PartNumber
        public string LotNummber   { get; set; } //LOTNumber
        public string Qty          { get; set; } //Quantity
        public string Unit         { get; set; } //Unit
        public string DeliverySlip { get; set; } //EBELN
        public string DeliveryItem { get; set; } //EBELP
        public string Repository   { get; set; } //Repository
        public string Category     { get; set; } 
        public string EoNumber     { get; set; }  
        public string ProdDate     { get; set; }  
        public string Model        { get; set; }  
    }
} 