using HWMX.DotNet;

namespace Microservices.Interfaces
{
    public interface ProjectsIService
    {
        Task<ResponseList<OptionDTO>> GetMenuTypeList();
        Task<ResponseList<OptionDTO>> GetProjectList(); 
    }
} 