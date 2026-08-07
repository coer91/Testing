namespace Repositories.Database.Location
{
    public class RACK_LOCATION_MATERIAL_DTO
    {
        public string PART_NUMBER { get; set; } 
        public string LOCATION { get; set; }
        public string RACK { get; set; }
        public string RACK_TYPE { get; set; }
        public int ROW { get; set; }
        public int COLUMN { get; set; }
    }
}