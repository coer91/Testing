namespace Microservices.DTOs
{
    public class LoginResponseDTO
    {
        public int UserId { get; set; }
        public string User { get; set; }
        public string DepartmentId { get; set; }
        public string Department { get; set; }
        public int PartnerId { get; set; }
        public string Partner { get; set; }
        public string FullName { get; set; } 
        public string Email { get; set; }
        public string Language { get; set; }
        public string Factory { get; set; }
        public string JWT { get; set; }
        public List<string> Roles { get; set; } = []; 
        public string Message { get; set; }
    }
}