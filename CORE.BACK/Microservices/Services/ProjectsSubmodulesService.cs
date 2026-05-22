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


        public async Task<ResponseList<ProjectSubmoduleDTO>> GetSubmoduleList(int projectId, int moduleId)
        {
            ResponseList<ProjectSubmoduleDTO> response = new();

            try
            {
                List<TblProjectsSubmodule> entities = await _projectSubmoduleRepository.GetProjectSubmoduleList(x
                    => projectId == x.Module.ProjectId
                    && (moduleId == 0 || x.ModuleId == moduleId)
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
                //Clean Data
                submoduleDTO.Name = submoduleDTO.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(submoduleDTO.Name))
                    return response.BadRequest();

                submoduleDTO.Icon = Clean.NoStringEmpty(submoduleDTO.Icon);

                //Exists?
                if (await _projectSubmoduleRepository.ExistsProjectSubmodule(x
                    => x.Name.ToUpper().Equals(submoduleDTO.Name.ToUpper())
                    && x.ModuleId == submoduleDTO.ModuleId
                )) return response.Conflict($"<b>{submoduleDTO.Name}</b> already exists");

                //Mapping
                TblProjectsSubmodule tblProjectsSubmodule = _mapper.Map<TblProjectsSubmodule>(submoduleDTO);
                tblProjectsSubmodule.Id = 0;
                tblProjectsSubmodule.Sequence = 0;

                //Create
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule);
                tblProjectsSubmodule = await _projectSubmoduleRepository.CreateProjectSubmodule(tblProjectsSubmodule);

                //Response
                response.Data = _mapper.Map<ProjectSubmoduleDTO>(tblProjectsSubmodule);
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
                //Clean Data
                submoduleDTO.Name = submoduleDTO.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(submoduleDTO.Name))
                    return response.BadRequest();

                submoduleDTO.Icon = Clean.NoStringEmpty(submoduleDTO.Icon);

                //Exists?
                if (await _projectSubmoduleRepository.ExistsProjectSubmodule(x
                    => x.Id != submoduleDTO.Id
                    && x.Name.ToUpper().Equals(submoduleDTO.Name.ToUpper())
                    && x.ModuleId == submoduleDTO.ModuleId
                )) return response.Conflict($"<b>{submoduleDTO.Name}</b> already exists");

                //Get
                TblProjectsSubmodule tblProjectsSubmodule = await _projectSubmoduleRepository.GetProjectSubmoduleBy(x => x.Id == submoduleDTO.Id);

                if (tblProjectsSubmodule is null)
                    return response.NotFound();

                //Mapping
                tblProjectsSubmodule = _mapper.Map<TblProjectsSubmodule>(submoduleDTO);

                //Update
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule);
                tblProjectsSubmodule = await _projectSubmoduleRepository.UpdateProjectSubmodule(tblProjectsSubmodule);

                //Response
                response.Data = _mapper.Map<ProjectSubmoduleDTO>(tblProjectsSubmodule);
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
                //Get
                TblProjectsSubmodule tblProjectsSubmodule = await _projectSubmoduleRepository.GetProjectSubmoduleBy(x => x.Id == submoduleId);

                if (tblProjectsSubmodule is null)
                    return response.NotFound();

                //Mapping
                patch.ApplyTo(tblProjectsSubmodule);

                //Clean Data
                tblProjectsSubmodule.Name = tblProjectsSubmodule.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(tblProjectsSubmodule.Name))
                    return response.BadRequest();

                tblProjectsSubmodule.Icon = Clean.NoStringEmpty(tblProjectsSubmodule.Icon);

                //Exists?
                if (await _projectSubmoduleRepository.ExistsProjectSubmodule(x
                    => x.Id != tblProjectsSubmodule.Id
                    && x.Name.ToUpper().Equals(tblProjectsSubmodule.Name.ToUpper())
                    && x.ModuleId == tblProjectsSubmodule.ModuleId
                )) return response.Conflict($"<b>{tblProjectsSubmodule.Name}</b> already exists");

                //Update
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule);
                tblProjectsSubmodule = await _projectSubmoduleRepository.UpdateProjectSubmodule(tblProjectsSubmodule);

                //Response
                response.Data = _mapper.Map<ProjectSubmoduleDTO>(tblProjectsSubmodule);
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
                //Get
                TblProjectsSubmodule tblProjectsSubmodule = await _projectSubmoduleRepository.GetProjectSubmoduleBy(x => x.Id == submoduleId);

                if (tblProjectsSubmodule is null)
                    return response.NotFound();

                //Has associated pages
                if (tblProjectsSubmodule.TblProjectsPages.Count != 0)
                    return response.Conflict($"<b>{tblProjectsSubmodule.Name}</b> has associated pages"); 

                //Delete
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule);
                await _projectSubmoduleRepository.DeleteProjectSubmodule(tblProjectsSubmodule);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 