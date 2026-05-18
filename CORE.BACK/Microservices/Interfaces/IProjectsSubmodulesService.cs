using Microsoft.AspNetCore.JsonPatch; 
using Microservices.DTOs;
using HWMX.DotNet;

namespace Microservices.Interfaces
{
    public interface ProjectsSubmodulesIService
    {
        Task<ResponseDTO<ProjectSubmoduleDTO>> GetSubmoduleById(int submoduleId);
        Task<ResponseList<ProjectSubmoduleDTO>> GetSubmoduleList(int moduleId);
        Task<ResponseDTO<ProjectSubmoduleDTO>> CreateSubmodule(ProjectSubmoduleDTO submoduleDTO);
        Task<ResponseDTO<ProjectSubmoduleDTO>> UpdateSubmodule(ProjectSubmoduleDTO submoduleDTO);
        Task<ResponseDTO<ProjectSubmoduleDTO>> PatchSubmodule(int submoduleId, JsonPatchDocument patch);
        Task<ResponseDTO<ProjectSubmoduleDTO>> DeleteSubmodule(int submoduleId);
    }
}