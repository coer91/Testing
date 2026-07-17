namespace Microservices.DTOs
{
    public class RackLocationDTO
    {
        public string Location { get; set; }
        public string Rack { get; set; }
        public string RackType { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
    }
} 