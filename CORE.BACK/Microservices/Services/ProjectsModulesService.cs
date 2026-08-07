using Microsoft.AspNetCore.JsonPatch;
using Repositories.Interfaces;
using Repositories.Database;
using Microservices.Interfaces;
using Microservices.DTOs;
using AutoMapper;
using HWMX.DotNet;

namespace Microservices.Services
{
    public class ProjectsModulesService(
        IProjectsModulesRepository _projectModuleRepository,
        ITranslatoryRepository _translatoryRepository,
        ITransaction<HWMXCoreContext> _transaction,
        IMapper _mapper
    ) : IProjectsModulesService {  

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
            await _transaction.BeginTransaction();

            try
            {
                //Clean Data
                moduleDTO.Translatory.English = moduleDTO.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                moduleDTO.Translatory.Spanish = moduleDTO?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                moduleDTO.Translatory.Korean = moduleDTO?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(moduleDTO.Translatory.English))
                    return response.BadRequest();

                moduleDTO.Icon = Clean.NoStringEmpty(moduleDTO.Icon);
                moduleDTO.Translatory.Spanish = Clean.NoStringEmpty(moduleDTO.Translatory.Spanish);
                moduleDTO.Translatory.Korean = Clean.NoStringEmpty(moduleDTO.Translatory.Korean);

                //Get translatory
                TblTranslatory tblTranslatory = await _translatoryRepository.GetTranslatoryBy(x => x.English.ToUpper().Equals(moduleDTO.Translatory.English.ToUpper()));

                if (tblTranslatory is null)
                {
                    tblTranslatory = new TblTranslatory
                    {
                        Id = 0,
                        English = moduleDTO.Translatory.English,
                        Spanish = moduleDTO.Translatory.Spanish,
                        Korean = moduleDTO.Translatory.Korean
                    };

                    tblTranslatory = await _translatoryRepository.CreateTranslatory(tblTranslatory); 
                }

                //Mapping
                TblProjectsModule tblProjectsModule = _mapper.Map<TblProjectsModule>(moduleDTO);
                tblProjectsModule.Id = 0;
                tblProjectsModule.TranslatoryId = tblTranslatory.Id;

                //Exists?
                if (await _projectModuleRepository.ExistsProjectModule(x
                    => x.ProjectId      == tblProjectsModule.ProjectId 
                    && x.Translatory.Id == tblProjectsModule.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> already exists"); 

                //Create
                tblProjectsModule = Clean.NoNesting(tblProjectsModule);
                tblProjectsModule = await _projectModuleRepository.CreateProjectModule(tblProjectsModule);

                //Response
                response.Data = _mapper.Map<ProjectModuleDTO>(tblProjectsModule);
                await _transaction.CommitTransaction();
            }

            catch (Exception ex)
            {
                await _transaction.RollbackTransaction();
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
                moduleDTO.Translatory.English = moduleDTO.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                moduleDTO.Translatory.Spanish = moduleDTO?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                moduleDTO.Translatory.Korean  = moduleDTO?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(moduleDTO.Translatory.English))
                    return response.BadRequest();

                moduleDTO.Icon = Clean.NoStringEmpty(moduleDTO.Icon);
                moduleDTO.Translatory.Spanish = Clean.NoStringEmpty(moduleDTO.Translatory.Spanish);
                moduleDTO.Translatory.Korean = Clean.NoStringEmpty(moduleDTO.Translatory.Korean); 
                
                //Get
                TblProjectsModule tblProjectsModule = await _projectModuleRepository.GetProjectModuleBy(x => x.Id == moduleDTO.Id);

                if (tblProjectsModule is null)
                    return response.NotFound();

                //Mapping
                tblProjectsModule = _mapper.Map<TblProjectsModule>(moduleDTO);

                //Exists?
                if (await _projectModuleRepository.ExistsProjectModule(x
                    => x.Id             != tblProjectsModule.Id
                    && x.ProjectId      == tblProjectsModule.ProjectId
                    && x.Translatory.Id == tblProjectsModule.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> already exists");

                //Exists Translatory?
                if (await _translatoryRepository.ExistsTranslatory(x
                    => x.Id != tblProjectsModule.TranslatoryId
                    && x.English.ToUpper().Equals(tblProjectsModule.Translatory.English.ToUpper())
                )) return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> already exists");

                //Update
                tblProjectsModule = Clean.NoNesting(tblProjectsModule, ["Translatory"]);
                tblProjectsModule.Translatory = Clean.NoNesting(tblProjectsModule.Translatory);
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

                tblProjectsModule.Icon = Clean.NoStringEmpty(tblProjectsModule.Icon);

                //Clean Data
                tblProjectsModule.Translatory.English = tblProjectsModule.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                tblProjectsModule.Translatory.Spanish = tblProjectsModule?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                tblProjectsModule.Translatory.Korean  = tblProjectsModule?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(tblProjectsModule.Translatory.English))
                    return response.BadRequest();

                tblProjectsModule.Icon = Clean.NoStringEmpty(tblProjectsModule.Icon);
                tblProjectsModule.Translatory.Spanish = Clean.NoStringEmpty(tblProjectsModule.Translatory.Spanish);
                tblProjectsModule.Translatory.Korean  = Clean.NoStringEmpty(tblProjectsModule.Translatory.Korean);

                //Exists?
                if (await _projectModuleRepository.ExistsProjectModule(x
                    => x.Id             != tblProjectsModule.Id
                    && x.ProjectId      == tblProjectsModule.ProjectId
                    && x.Translatory.Id == tblProjectsModule.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> already exists");

                //Exists Translatory?
                if (await _translatoryRepository.ExistsTranslatory(x
                    => x.Id != tblProjectsModule.TranslatoryId
                    && x.English.ToUpper().Equals(tblProjectsModule.Translatory.English.ToUpper())
                )) return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> already exists");

                //Update
                tblProjectsModule = Clean.NoNesting(tblProjectsModule, ["Translatory"]);
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
                    return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> has associated pages");

                //Has associated submodules
                if (tblProjectsModule.TblProjectsSubmodules.Count != 0)
                    return response.Conflict($"<b>{tblProjectsModule.Translatory.English}</b> has associated submodules");

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