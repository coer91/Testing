namespace Microservices.DTOs
{
    public class LoginResponseDTO
    {
        public int UserId { get; set; }
        public string User { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
        public int PartnerId { get; set; }
        public string Partner { get; set; }
        public string FullName { get; set; } 
        public string Email { get; set; }
        public string JWT { get; set; }
        public List<string> Roles { get; set; } = []; 
        public string Message { get; set; }
    }
}