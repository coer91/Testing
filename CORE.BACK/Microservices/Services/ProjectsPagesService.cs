using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.Database;
using Repositories.Interfaces; 

namespace Microservices.Services
{
    public class ProjectsPagesService(
        IProjectsPagesRepository _projectPagesRepository,
        ITranslatoryRepository _translatoryRepository,
        ITransaction<HWMXCoreContext> _transaction,
        IMapper _mapper
    ) : IProjectsPagesService { 

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
            await _transaction.BeginTransaction();

            try
            {
                //Clean Data
                pageDTO.Translatory.English = pageDTO.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                pageDTO.Translatory.Spanish = pageDTO?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                pageDTO.Translatory.Korean  = pageDTO?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(pageDTO.Translatory.English))
                    return response.BadRequest();

                pageDTO.Icon = Clean.NoStringEmpty(pageDTO.Icon);
                pageDTO.ActiveKey = Clean.NoStringEmpty(pageDTO.ActiveKey);
                pageDTO.Translatory.Spanish = Clean.NoStringEmpty(pageDTO.Translatory.Spanish);
                pageDTO.Translatory.Korean  = Clean.NoStringEmpty(pageDTO.Translatory.Korean);

                //Get translatory
                TblTranslatory tblTranslatory = await _translatoryRepository.GetTranslatoryBy(x => x.English.ToUpper().Equals(pageDTO.Translatory.English.ToUpper()));

                if (tblTranslatory is null)
                {
                    tblTranslatory = new TblTranslatory
                    {
                        Id = 0,
                        English = pageDTO.Translatory.English,
                        Spanish = pageDTO.Translatory.Spanish,
                        Korean  = pageDTO.Translatory.Korean
                    };

                    tblTranslatory = await _translatoryRepository.CreateTranslatory(tblTranslatory);
                }

                //Mapping
                TblProjectsPage tblProjectsPage = _mapper.Map<TblProjectsPage>(pageDTO);
                tblProjectsPage.Id = 0;
                tblProjectsPage.TranslatoryId = tblTranslatory.Id;

                //Exists?
                if (await _projectPagesRepository.ExistsProjectPage(x
                    => x.ProjectId == pageDTO.ProjectId
                    && x.ModuleId == pageDTO.ModuleId
                    && x.SubmoduleId == pageDTO.SubmoduleId
                    && x.Translatory.Id == tblProjectsPage.TranslatoryId
                )) return response.Conflict($"<b>{tblTranslatory.English}</b> already exists");

                //Create
                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
                tblProjectsPage = await _projectPagesRepository.CreateProjectPage(tblProjectsPage);

                //Response
                response.Data = _mapper.Map<ProjectPageDTO>(tblProjectsPage);
                await _transaction.CommitTransaction();
            }

            catch (Exception ex)
            {
                await _transaction.RollbackTransaction();
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO<ProjectPageDTO>> UpdatePage(ProjectPageDTO pageDTO)
        {
            ResponseDTO<ProjectPageDTO> response = new();

            try
            {
                //Clean Data
                pageDTO.Translatory.English = pageDTO.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                pageDTO.Translatory.Spanish = pageDTO?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                pageDTO.Translatory.Korean = pageDTO?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(pageDTO.Translatory.English))
                    return response.BadRequest();

                pageDTO.Icon = Clean.NoStringEmpty(pageDTO.Icon);
                pageDTO.ActiveKey = Clean.NoStringEmpty(pageDTO.ActiveKey);
                pageDTO.Translatory.Spanish = Clean.NoStringEmpty(pageDTO.Translatory.Spanish);
                pageDTO.Translatory.Korean = Clean.NoStringEmpty(pageDTO.Translatory.Korean);

                //Get
                TblProjectsPage tblProjectsPage = await _projectPagesRepository.GetProjectPageBy(x => x.Id == pageDTO.Id);

                if (tblProjectsPage is null)
                    return response.NotFound();

                //Mapping
                tblProjectsPage = _mapper.Map<TblProjectsPage>(pageDTO);

                //Exists?
                if (await _projectPagesRepository.ExistsProjectPage(x
                    => x.Id             != tblProjectsPage.Id
                    && x.ProjectId      == tblProjectsPage.ProjectId
                    && x.ModuleId       == tblProjectsPage.ModuleId
                    && x.SubmoduleId    == tblProjectsPage.SubmoduleId
                    && x.Translatory.Id == tblProjectsPage.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsPage.Translatory.English}</b> already exists");

                //Exists Translatory?
                if (await _translatoryRepository.ExistsTranslatory(x
                    => x.Id != tblProjectsPage.TranslatoryId
                    && x.English.ToUpper().Equals(tblProjectsPage.Translatory.English.ToUpper())
                )) return response.Conflict($"<b>{tblProjectsPage.Translatory.English}</b> already exists");

                //Update
                tblProjectsPage = Clean.NoNesting(tblProjectsPage, ["Translatory"]);
                tblProjectsPage.Translatory = Clean.NoNesting(tblProjectsPage.Translatory);
                tblProjectsPage = await _projectPagesRepository.UpdateProjectPage(tblProjectsPage); 

                //Response
                response.Data = _mapper.Map<ProjectPageDTO>(tblProjectsPage);
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
                //Get
                TblProjectsPage tblProjectsPage = await _projectPagesRepository.GetProjectPageBy(x => x.Id == pageId);

                if (tblProjectsPage is null)
                    return response.NotFound();

                //Mapping
                patch.ApplyTo(tblProjectsPage);

                //Clean Data
                tblProjectsPage.Translatory.English = tblProjectsPage.Translatory?.English?.CleanUpBlanks()?.FirstCharToUpper();
                tblProjectsPage.Translatory.Spanish = tblProjectsPage?.Translatory?.Spanish?.CleanUpBlanks()?.FirstCharToUpper();
                tblProjectsPage.Translatory.Korean  = tblProjectsPage?.Translatory?.Korean?.CleanUpBlanks()?.FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(tblProjectsPage.Translatory.English))
                    return response.BadRequest();

                tblProjectsPage.Icon = Clean.NoStringEmpty(tblProjectsPage.Icon);
                tblProjectsPage.ActiveKey = Clean.NoStringEmpty(tblProjectsPage.ActiveKey);
                tblProjectsPage.Translatory.Spanish = Clean.NoStringEmpty(tblProjectsPage.Translatory.Spanish);
                tblProjectsPage.Translatory.Korean  = Clean.NoStringEmpty(tblProjectsPage.Translatory.Korean);

                //Exists?
                if (await _projectPagesRepository.ExistsProjectPage(x
                    => x.Id             != tblProjectsPage.Id
                    && x.ProjectId      == tblProjectsPage.ProjectId
                    && x.ModuleId       == tblProjectsPage.ModuleId
                    && x.SubmoduleId    == tblProjectsPage.SubmoduleId
                    && x.Translatory.Id == tblProjectsPage.TranslatoryId
                )) return response.Conflict($"<b>{tblProjectsPage.Translatory.English}</b> already exists");

                //Exists Translatory?
                if (await _translatoryRepository.ExistsTranslatory(x
                    => x.Id != tblProjectsPage.TranslatoryId
                    && x.English.ToUpper().Equals(tblProjectsPage.Translatory.English.ToUpper())
                )) return response.Conflict($"<b>{tblProjectsPage.Translatory.English}</b> already exists");

                //Update
                tblProjectsPage = Clean.NoNesting(tblProjectsPage, ["Translatory"]);
                tblProjectsPage = await _projectPagesRepository.UpdateProjectPage(tblProjectsPage);

                //Response
                response.Data = _mapper.Map<ProjectPageDTO>(tblProjectsPage);
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
                //Get
                TblProjectsPage tblProjectsPage = await _projectPagesRepository.GetProjectPageBy(x => x.Id == pageId);

                if (tblProjectsPage is null)
                    return response.NotFound();

                //Has associated roles
                if (tblProjectsPage.TblRolesPages.Count != 0)
                    return response.Conflict($"<b>{tblProjectsPage.Translatory.English}</b> has associated roles");

                //Delete
                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
                await _projectPagesRepository.DeleteProjectPage(tblProjectsPage);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 