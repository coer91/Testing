using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces;

namespace Microservices.Services
{
    public class ProjectsPagesService(IProjectsPagesRepository _projectPagesRepository, IMapper _mapper) : IProjectsPagesService
    { 

        public async Task<ResponseDTO<ProjectPageDTO>> GetPageById(int pageId)
        {
            ResponseDTO<ProjectPageDTO> response = new();

            try
            {
                TblProjectsPage entity = await _projectPagesRepository.GetProjectPageBy(x => x.Id == pageId);

                if (entity is null)
                    return response.NotFound();

                //Response
                response.Data = _mapper.Map<ProjectPageDTO>(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<ProjectPageDTO>> GetPageList(int projectId, int moduleId = 0, int submoduleId = 0, bool onlyActive = true)
        {
            ResponseList<ProjectPageDTO> response = new();

            try
            {
                List<TblProjectsPage> entities = await _projectPagesRepository.GetProjectPageList(x
                  => x.ProjectId == projectId
                  && (moduleId == 0    || x.ModuleId == moduleId)
                  && (submoduleId == 0 || x.SubmoduleId == submoduleId)
                  && (!onlyActive      || x.IsActive)
               );

                List<ProjectPageDTO> dtoList = _mapper.Map<List<ProjectPageDTO>>(entities);

                //Response
                response.Data = [.. dtoList
                    .OrderBy(x => x.Project)
                    .ThenBy(x => x.Module)
                    .ThenBy(x => x.Submodule)
                    .ThenBy(x => x.Name)
                ];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectPageDTO>> CreatePage(ProjectPageDTO pageDTO)
        {
            ResponseDTO<ProjectPageDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectPageDTO>> UpdatePage(ProjectPageDTO pageDTO)
        {
            ResponseDTO<ProjectPageDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectPageDTO>> PatchPage(int pageId, JsonPatchDocument patch)
        {
            ResponseDTO<ProjectPageDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectPageDTO>> DeletePage(int pageId)
        {
            ResponseDTO<ProjectPageDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 