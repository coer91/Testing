using HWMX.DotNet;
using Microservices.DTOs; 

namespace Microservices.Interfaces
{
    public interface INavigationService
    {
        Task<ResponseList<NavigationDTO>> GetNavigation(int projectId);
        Task<ResponseList<NavigationDTO>> GetNavigationByRole(int projectId, int roleId);
        Task<ResponseList<NavigationDTO>> GetNavigationByProject(int projectId);
        Task<ResponseDTO> UpdateLevel1(int projectId, List<NavigationDTO> navigation);
        Task<ResponseDTO> UpdateLevel2(int projectId, int moduleId, List<NavigationDTO> navigation);
        Task<ResponseDTO> UpdateLevel3(int projectId, int moduleId, int submoduleId, List<NavigationDTO> navigation);
    }
}