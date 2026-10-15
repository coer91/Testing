using Microsoft.AspNetCore.Http; 

namespace Microservices.DTOs
{
    public class ImageDTO
    {
        public int Id { get; set; }

        public int UserId { get; set; } 

        public string Name { get; set; }

        public string Extension { get; set; } 

        public IFormFile Image { get; set; }

        public string Base64 { get; set; }
    } 
} 