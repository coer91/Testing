namespace Microservices.DTOs
{
    public class UserRoleDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string User { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
        public bool IsMain { get; set; }
    }
}