using Microsoft.AspNetCore.JsonPatch;
using Microservices.DTOs;
using HWMX.DotNet; 

namespace Microservices.Interfaces
{
    public interface IProjectsModulesService
    {
        Task<ResponseDTO<ProjectModuleDTO>> GetModuleById(int moduleId);
        Task<ResponseList<ProjectModuleDTO>> GetModuleList(int projectId);
        Task<ResponseDTO<ProjectModuleDTO>> CreateModule(ProjectModuleDTO moduleDTO);
        Task<ResponseDTO<ProjectModuleDTO>> UpdateModule(ProjectModuleDTO moduleDTO);
        Task<ResponseDTO<ProjectModuleDTO>> PatchModule(int moduleId, JsonPatchDocument patch);
        Task<ResponseDTO<ProjectModuleDTO>> DeleteModule(int moduleId);
    }
}