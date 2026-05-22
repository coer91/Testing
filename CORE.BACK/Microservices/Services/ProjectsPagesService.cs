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
                //Clean Data
                pageDTO.Name = pageDTO.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(pageDTO.Name))
                    return response.BadRequest();

                pageDTO.Icon = Clean.NoStringEmpty(pageDTO.Icon);
                pageDTO.ActiveKey = Clean.NoStringEmpty(pageDTO.ActiveKey);

                //Exists?
                if (await _projectPagesRepository.ExistsProjectPage(x
                    => x.Name.ToUpper().Equals(pageDTO.Name.ToUpper())
                    && x.ProjectId   == pageDTO.ProjectId
                    && x.ModuleId    == pageDTO.ModuleId
                    && x.SubmoduleId == pageDTO.SubmoduleId
                )) return response.Conflict($"<b>{pageDTO.Name}</b> already exists");

                //Mapping
                TblProjectsPage tblProjectsPage = _mapper.Map<TblProjectsPage>(pageDTO);
                tblProjectsPage.Id = 0;
                tblProjectsPage.Sequence = 0;

                //Create
                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
                tblProjectsPage = await _projectPagesRepository.CreateProjectPage(tblProjectsPage);

                //Response
                response.Data = _mapper.Map<ProjectPageDTO>(tblProjectsPage);
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
                //Clean Data
                pageDTO.Name = pageDTO.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(pageDTO.Name))
                    return response.BadRequest();

                pageDTO.Icon = Clean.NoStringEmpty(pageDTO.Icon);
                pageDTO.ActiveKey = Clean.NoStringEmpty(pageDTO.ActiveKey);

                //Exists? 
                if (await _projectPagesRepository.ExistsProjectPage(x
                    => x.Id != pageDTO.Id
                    && x.Name.ToUpper().Equals(pageDTO.Name.ToUpper())
                    && x.ProjectId   == pageDTO.ProjectId
                    && x.ModuleId    == pageDTO.ModuleId
                    && x.SubmoduleId == pageDTO.SubmoduleId
                )) return response.Conflict($"<b>{pageDTO.Name}</b> already exists");


                //Get
                TblProjectsPage tblProjectsPage = await _projectPagesRepository.GetProjectPageBy(x => x.Id == pageDTO.Id);

                if (tblProjectsPage is null)
                    return response.NotFound();

                //Mapping
                tblProjectsPage = _mapper.Map<TblProjectsPage>(pageDTO);

                //Update
                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
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
                tblProjectsPage.Name = tblProjectsPage.Name.CleanUpBlanks().FirstCharToUpper();

                if (string.IsNullOrWhiteSpace(tblProjectsPage.Name))
                    return response.BadRequest();

                tblProjectsPage.Icon = Clean.NoStringEmpty(tblProjectsPage.Icon);
                tblProjectsPage.ActiveKey = Clean.NoStringEmpty(tblProjectsPage.ActiveKey);

                //Exists?
                if (await _projectPagesRepository.ExistsProjectPage(x
                    => x.Id != tblProjectsPage.Id
                    && x.Name.ToUpper().Equals(tblProjectsPage.Name.ToUpper())
                    && x.ProjectId   == tblProjectsPage.ProjectId
                    && x.ModuleId    == tblProjectsPage.ModuleId
                    && x.SubmoduleId == tblProjectsPage.SubmoduleId
                )) return response.Conflict($"<b>{tblProjectsPage.Name}</b> already exists");

                //Update
                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
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
                    return response.Conflict($"<b>{tblProjectsPage.Name}</b> has associated roles");

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