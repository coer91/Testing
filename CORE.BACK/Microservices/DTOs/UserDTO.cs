using HWMX.DotNet;

namespace Microservices.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; } 
        public OptionDTO Partner { get; set; }
        public OptionDTO Role { get; set; }
        public List<OptionDTO> Roles { get; set; } = [];
    }
}