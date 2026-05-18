using HWMX.DotNet;
using Microservices.DTOs; 

namespace Microservices.Interfaces
{
    public interface INavigationService
    {
        Task<ResponseList<NavigationDTO>> GetNavigation(int projectId);
        Task<ResponseList<NavigationDTO>> GetNavigationByRole(int projectId, int roleId);
        Task<ResponseDTO<NavigationDTO>> UpdateLevel1(int projectId, List<NavigationDTO> navigation);
        Task<ResponseDTO<NavigationDTO>> UpdateLevel2(int projectId, int moduleId, List<NavigationDTO> navigation);
        Task<ResponseDTO<NavigationDTO>> UpdateLevel3(int projectId, int moduleId, int submoduleId, List<NavigationDTO> navigation);
    }
}