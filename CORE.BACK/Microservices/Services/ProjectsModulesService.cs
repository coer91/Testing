using Microsoft.AspNetCore.JsonPatch;
using Repositories.HWMXCore.Interfaces;
using Repositories.HWMXCore.Database;
using Microservices.Interfaces;
using Microservices.DTOs;
using AutoMapper;
using HWMX.DotNet;

namespace Microservices.Services
{
    public class ProjectsModulesService(IProjectsModulesRepository _projectModuleRepository, IMapper _mapper) : IProjectsModulesService
    {  

        public async Task<ResponseDTO<ProjectModuleDTO>> GetModuleById(int moduleId) 
        {
            ResponseDTO<ProjectModuleDTO> response = new();

            try
            {
                TblProjectsModule entity = await _projectModuleRepository.GetProjectModuleBy(x => x.Id == moduleId);

                if (entity is null)
                    return response.NotFound();

                //Response
                response.Data = _mapper.Map<ProjectModuleDTO>(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<ProjectModuleDTO>> GetModuleList(int projectId) 
        {
            ResponseList<ProjectModuleDTO> response = new();

            try
            {
                List<TblProjectsModule> entities = await _projectModuleRepository.GetProjectModuleList(x
                   => x.ProjectId == projectId
                );

                List<ProjectModuleDTO> dtoList = _mapper.Map<List<ProjectModuleDTO>>(entities);

                //Response
                response.Data = [.. dtoList.OrderBy(x => x.Name)];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectModuleDTO>> CreateModule(ProjectModuleDTO moduleDTO)
        {
            ResponseDTO<ProjectModuleDTO> response = new();

            try
            {
                //Clean Data
                moduleDTO.Name = moduleDTO.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(moduleDTO.Name))
                    return response.BadRequest();

                moduleDTO.Icon = Clean.NoStringEmpty(moduleDTO.Icon);

                //Exists?
                if (await _projectModuleRepository.ExistsProjectModule(x
                    => x.Name.ToUpper().Equals(moduleDTO.Name.ToUpper())
                    && x.ProjectId == moduleDTO.ProjectId
                )) return response.Conflict($"<b>{moduleDTO.Name}</b> already exists");

                //Mapping
                TblProjectsModule tblProjectsModule = _mapper.Map<TblProjectsModule>(moduleDTO);
                tblProjectsModule.Id = 0;
                tblProjectsModule.Sequence = 0;

                //Create
                tblProjectsModule = Clean.NoNesting(tblProjectsModule);
                tblProjectsModule = await _projectModuleRepository.CreateProjectModule(tblProjectsModule);

                //Response
                response.Data = _mapper.Map<ProjectModuleDTO>(tblProjectsModule);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectModuleDTO>> UpdateModule(ProjectModuleDTO moduleDTO)
        {
            ResponseDTO<ProjectModuleDTO> response = new();

            try
            {
                //Clean Data
                moduleDTO.Name = moduleDTO.Name.CleanUpBlanks().FirstCharToUpper(); 

                if (string.IsNullOrWhiteSpace(moduleDTO.Name))
                    return response.BadRequest();

                moduleDTO.Icon = Clean.NoStringEmpty(moduleDTO.Icon);

                //Exists?
                if (await _projectModuleRepository.ExistsProjectModule(x
                    => x.Id != moduleDTO.Id
                    && x.Name.ToUpper().Equals(moduleDTO.Name.ToUpper())
                    && x.ProjectId == moduleDTO.ProjectId
                )) return response.Conflict($"<b>{moduleDTO.Name}</b> already exists");

                //Get
                TblProjectsModule tblProjectsModule = await _projectModuleRepository.GetProjectModuleBy(x => x.Id == moduleDTO.Id);

                if (tblProjectsModule is null)
                    return response.NotFound();

                //Mapping
                tblProjectsModule = _mapper.Map<TblProjectsModule>(moduleDTO);

                //Update
                tblProjectsModule = Clean.NoNesting(tblProjectsModule);
                tblProjectsModule = await _projectModuleRepository.UpdateProjectModule(tblProjectsModule);

                //Response
                response.Data = _mapper.Map<ProjectModuleDTO>(tblProjectsModule);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectModuleDTO>> PatchModule(int moduleId, JsonPatchDocument patch)
        {
            ResponseDTO<ProjectModuleDTO> response = new();

            try
            {
                //Get
                TblProjectsModule tblProjectsModule = await _projectModuleRepository.GetProjectModuleBy(x => x.Id == moduleId);

                if (tblProjectsModule is null)
                    return response.NotFound();

                //Mapping
                patch.ApplyTo(tblProjectsModule);

                //Clean Data
                tblProjectsModule.Name = tblProjectsModule.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(tblProjectsModule.Name))
                    return response.BadRequest();

                tblProjectsModule.Icon = Clean.NoStringEmpty(tblProjectsModule.Icon);

                //Exists?
                if (await _projectModuleRepository.ExistsProjectModule(x
                    => x.Id != tblProjectsModule.Id
                    && x.Name.ToUpper().Equals(tblProjectsModule.Name.ToUpper())
                    && x.ProjectId == tblProjectsModule.ProjectId
                )) return response.Conflict($"<b>{tblProjectsModule.Name}</b> already exists");

                //Update
                tblProjectsModule = Clean.NoNesting(tblProjectsModule);
                tblProjectsModule = await _projectModuleRepository.UpdateProjectModule(tblProjectsModule);

                //Response
                response.Data = _mapper.Map<ProjectModuleDTO>(tblProjectsModule);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectModuleDTO>> DeleteModule(int moduleId)
        {
            ResponseDTO<ProjectModuleDTO> response = new();

            try
            {
                //Get
                TblProjectsModule tblProjectsModule = await _projectModuleRepository.GetProjectModuleBy(x => x.Id == moduleId);

                if (tblProjectsModule is null)
                    return response.NotFound();

                //Has associated pages
                if (tblProjectsModule.TblProjectsPages.Count != 0)
                    return response.Conflict($"<b>{tblProjectsModule.Name}</b> has associated pages");

                //Has associated submodules
                if (tblProjectsModule.TblProjectsSubmodules.Count != 0)
                    return response.Conflict($"<b>{tblProjectsModule.Name}</b> has associated submodules");

                //Delete
                tblProjectsModule = Clean.NoNesting(tblProjectsModule);
                await _projectModuleRepository.DeleteProjectsModule(tblProjectsModule);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 