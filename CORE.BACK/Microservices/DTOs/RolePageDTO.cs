namespace Microservices.DTOs
{
    public class RolePageDTO
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
        public int PageId { get; set; }
        public string Page { get; set; }
        public int ProjectId { get; set; }
        public string Project { get; set; }
        public int? ModuleId { get; set; }
        public string Module { get; set; }
        public int? SubmoduleId { get; set; }
        public string Submodule { get; set; }
        public string Path { get; set; }
        public bool CanCreate { get; set; }
        public bool CanUpdate { get; set; }
        public bool CanDelete { get; set; }
    }
}