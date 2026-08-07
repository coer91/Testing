using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.Database;
using Repositories.Interfaces; 

namespace Microservices.Services
{
    public class ProjectsSubmodulesService(
        IProjectsSubmodulesRepository _projectSubmoduleRepository,
        ITranslatoryRepository _translatoryRepository,
        ITransaction<HWMXCoreContext> _transaction, 
        IMapper _mapper
    ) : ProjectsSubmodulesIService { 

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
            await _transaction.BeginTransaction();

            try
            {
                //Clean Data
                submoduleDTO.Translatory.English = submoduleDTO.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                submoduleDTO.Translatory.Spanish = submoduleDTO?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                submoduleDTO.Translatory.Korean  = submoduleDTO?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(submoduleDTO.Translatory.English))
                    return response.BadRequest();

                submoduleDTO.Icon = Clean.NoStringEmpty(submoduleDTO.Icon);
                submoduleDTO.Translatory.Spanish = Clean.NoStringEmpty(submoduleDTO.Translatory.Spanish);
                submoduleDTO.Translatory.Korean = Clean.NoStringEmpty(submoduleDTO.Translatory.Korean);

                //Get translatory
                TblTranslatory tblTranslatory = await _translatoryRepository.GetTranslatoryBy(x => x.English.ToUpper().Equals(submoduleDTO.Translatory.English.ToUpper()));

                if (tblTranslatory is null)
                {
                    tblTranslatory = new TblTranslatory
                    {
                        Id = 0,
                        English = submoduleDTO.Translatory.English,
                        Spanish = submoduleDTO.Translatory.Spanish,
                        Korean  = submoduleDTO.Translatory.Korean
                    };

                    tblTranslatory = await _translatoryRepository.CreateTranslatory(tblTranslatory);
                }

                //Mapping
                TblProjectsSubmodule tblProjectsSubmodule = _mapper.Map<TblProjectsSubmodule>(submoduleDTO);
                tblProjectsSubmodule.Id = 0;
                tblProjectsSubmodule.TranslatoryId = tblTranslatory.Id;

                //Exists?
                if (await _projectSubmoduleRepository.ExistsProjectSubmodule(x
                    => x.ModuleId       == tblProjectsSubmodule.ModuleId
                    && x.Translatory.Id == tblProjectsSubmodule.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsSubmodule.Translatory.English}</b> already exists"); 

                //Create
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule);
                tblProjectsSubmodule = await _projectSubmoduleRepository.CreateProjectSubmodule(tblProjectsSubmodule);

                //Response
                response.Data = _mapper.Map<ProjectSubmoduleDTO>(tblProjectsSubmodule);
                await _transaction.CommitTransaction();
            }

            catch (Exception ex)
            {
                await _transaction.RollbackTransaction();
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
                submoduleDTO.Translatory.English = submoduleDTO.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                submoduleDTO.Translatory.Spanish = submoduleDTO?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                submoduleDTO.Translatory.Korean  = submoduleDTO?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(submoduleDTO.Translatory.English))
                    return response.BadRequest();

                submoduleDTO.Icon = Clean.NoStringEmpty(submoduleDTO.Icon);
                submoduleDTO.Translatory.Spanish = Clean.NoStringEmpty(submoduleDTO.Translatory.Spanish);
                submoduleDTO.Translatory.Korean  = Clean.NoStringEmpty(submoduleDTO.Translatory.Korean);

                //Get
                TblProjectsSubmodule tblProjectsSubmodule = await _projectSubmoduleRepository.GetProjectSubmoduleBy(x => x.Id == submoduleDTO.Id);

                if (tblProjectsSubmodule is null)
                    return response.NotFound();

                //Mapping
                tblProjectsSubmodule = _mapper.Map<TblProjectsSubmodule>(submoduleDTO);

                //Exists?
                if (await _projectSubmoduleRepository.ExistsProjectSubmodule(x
                    => x.Id             != tblProjectsSubmodule.Id
                    && x.ModuleId       == tblProjectsSubmodule.ModuleId
                    && x.Translatory.Id == tblProjectsSubmodule.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsSubmodule.Translatory.English}</b> already exists");

                //Exists Translatory?
                if (await _translatoryRepository.ExistsTranslatory(x
                    => x.Id != tblProjectsSubmodule.TranslatoryId
                    && x.English.ToUpper().Equals(tblProjectsSubmodule.Translatory.English.ToUpper())
                )) return response.Conflict($"<b>{tblProjectsSubmodule.Translatory.English}</b> already exists");

                //Update
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule, ["Translatory"]);
                tblProjectsSubmodule.Translatory = Clean.NoNesting(tblProjectsSubmodule.Translatory);
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
                tblProjectsSubmodule.Translatory.English = tblProjectsSubmodule.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                tblProjectsSubmodule.Translatory.Spanish = tblProjectsSubmodule?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                tblProjectsSubmodule.Translatory.Korean  = tblProjectsSubmodule?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(tblProjectsSubmodule.Translatory.English))
                    return response.BadRequest();

                tblProjectsSubmodule.Icon = Clean.NoStringEmpty(tblProjectsSubmodule.Icon);
                tblProjectsSubmodule.Translatory.Spanish = Clean.NoStringEmpty(tblProjectsSubmodule.Translatory.Spanish);
                tblProjectsSubmodule.Translatory.Korean  = Clean.NoStringEmpty(tblProjectsSubmodule.Translatory.Korean);

                //Exists?
                if (await _projectSubmoduleRepository.ExistsProjectSubmodule(x
                    => x.Id             != tblProjectsSubmodule.Id
                    && x.ModuleId       == tblProjectsSubmodule.ModuleId
                    && x.Translatory.Id == tblProjectsSubmodule.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsSubmodule.Translatory.English}</b> already exists");

                //Exists Translatory?
                if (await _translatoryRepository.ExistsTranslatory(x
                    => x.Id != tblProjectsSubmodule.TranslatoryId
                    && x.English.ToUpper().Equals(tblProjectsSubmodule.Translatory.English.ToUpper())
                )) return response.Conflict($"<b>{tblProjectsSubmodule.Translatory.English}</b> already exists");

                //Update
                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule, ["Translatory"]);
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
                    return response.Conflict($"<b>{tblProjectsSubmodule.Translatory.English}</b> has associated pages");

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