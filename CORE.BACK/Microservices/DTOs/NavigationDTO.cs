namespace Microservices.DTOs
{
    public class NavigationDTO
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
        public string Path { get; set; }
        public string MenuType { get; set; }
        public bool CanCreate { get; set; }
        public bool CanUpdate { get; set; }
        public bool CanDelete { get; set; }
        public string ActiveKey { get; set; }
        public bool ShowIndicator { get; set; }
        public int Secuence { get; set; }
        public List<NavigationDTO> Items { get; set; } = [];
    }
}