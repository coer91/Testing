using Microsoft.AspNetCore.JsonPatch;
using Microservices.DTOs;
using HWMX.DotNet;

namespace Microservices.Interfaces
{
    public interface IProjectsPagesService
    {
        Task<ResponseDTO<ProjectPageDTO>> GetPageById(int pageId);
        Task<ResponseList<ProjectPageDTO>> GetPageList(int projectId, int moduleId = 0, int submoduleId = 0, bool onlyActive = true);
        Task<ResponseDTO<ProjectPageDTO>> CreatePage(ProjectPageDTO pageDTO);
        Task<ResponseDTO<ProjectPageDTO>> UpdatePage(ProjectPageDTO pageDTO);
        Task<ResponseDTO<ProjectPageDTO>> PatchPage(int pageId, JsonPatchDocument patch);
        Task<ResponseDTO<ProjectPageDTO>> DeletePage(int pageId);
    }
} 