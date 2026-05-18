using Microsoft.AspNetCore.JsonPatch;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Database;
using Microservices.Interfaces;
using Microservices.DTOs;
using AutoMapper;
using HWMX.DotNet;

namespace Microservices.Services
{
    public class ProjectsSubmodulesService(IProjectsSubmodulesRepository _projectSubmoduleRepository, IMapper _mapper) : ProjectsSubmodulesIService
    { 

        public async Task<ResponseDTO<ProjectSubmoduleDTO>> GetSubmoduleById(int submoduleId) 
        {
            ResponseDTO<ProjectSubmoduleDTO> response = new();

            try
            {
                TblProjectsSubmodule entity = await _projectSubmoduleRepository.GetProjectSubmoduleBy(x => x.Id == submoduleId);

                if (entity is null)
                    return response.NotFound();

                //Response
                response.Data = _mapper.Map<ProjectSubmoduleDTO>(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<ProjectSubmoduleDTO>> GetSubmoduleList(int moduleId)
        {
            ResponseList<ProjectSubmoduleDTO> response = new();

            try
            {
                List<TblProjectsSubmodule> entities = await _projectSubmoduleRepository.GetProjectSubmoduleList(x
                   => x.ModuleId == moduleId
                );

                List<ProjectSubmoduleDTO> dtoList = _mapper.Map<List<ProjectSubmoduleDTO>>(entities);

                //Response
                response.Data = [.. dtoList.OrderBy(x => x.Name)];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectSubmoduleDTO>> CreateSubmodule(ProjectSubmoduleDTO submoduleDTO)
        {
            ResponseDTO<ProjectSubmoduleDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectSubmoduleDTO>> UpdateSubmodule(ProjectSubmoduleDTO submoduleDTO)
        {
            ResponseDTO<ProjectSubmoduleDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectSubmoduleDTO>> PatchSubmodule(int submoduleId, JsonPatchDocument patch)
        {
            ResponseDTO<ProjectSubmoduleDTO> response = new();

            try
            {

            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectSubmoduleDTO>> DeleteSubmodule(int submoduleId)
        {
            ResponseDTO<ProjectSubmoduleDTO> response = new();

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