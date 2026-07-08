using AutoMapper;
using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Interfaces; 

namespace Microservices.Services
{
    public class NavigationService(
        IProjectsPagesRepository _pageRepository,
        IProjectsModulesRepository _moduleRepository,
        IProjectsSubmodulesRepository _submoduleRepository,
        IRolesPagesRepository _rolePageRepository,
        IProjectsRepository _projectRepository,
        IHttpContextAccessor _httpContextAccessor,
        IMapper _mapper
    ) : INavigationService {


        public async Task<ResponseList<NavigationDTO>> GetNavigation(int projectId)
        {
            ResponseList<NavigationDTO> response = new();

            try
            {
                int userId = _httpContextAccessor.ToHttpRequest().UserId;
                string languageId = _httpContextAccessor.ToHttpRequest().Language;
                List <TblRolesPage> tblRolesPage = await _projectRepository.GetNavigationByUser(projectId, userId); 

                //Get Navigation
                response.Data = tblRolesPage.Count != 0 ? BuildNavigation(tblRolesPage, languageId) : [];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response; 
        }


        public async Task<ResponseList<NavigationDTO>> GetNavigationByRole(int projectId, int roleId)
        {
            ResponseList<NavigationDTO> response = new();

            try
            {
                IEnumerable<TblRolesPage> tblRolesPage = await _rolePageRepository.GetRolePageList(x
                    => x.Page.ProjectId == projectId
                    && x.RoleId == roleId
                    && x.Page.IsActive
                    && x.Role.IsActive
                );

                //Get Navigation
                response.Data = tblRolesPage.Any() ? BuildNavigation(tblRolesPage) : [];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<NavigationDTO>> GetNavigationByProject(int projectId)
        {
            ResponseList<NavigationDTO> response = new();

            try
            {
                TblProject tblProject = await _projectRepository.GetProjectBy(x => x.Id == projectId);
                List<TblRolesPage> tblRolesPage = _mapper.Map<List<TblRolesPage>>(tblProject.TblProjectsPages);

                //Get Navigation
                response.Data = tblRolesPage.Count != 0 ? BuildNavigation(tblRolesPage) : [];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        #region BuildNavigation
        private static List<NavigationDTO> BuildNavigation(IEnumerable<TblRolesPage> tblRolesPage, string languageId = LANGUAGE.ENGLISH.Id)
        {
            //GET Level 1 
            List<NavigationDTO> root = GetLevel1(tblRolesPage, languageId);

            root = [..
                from LV1 in root

                select new NavigationDTO
                {
                    Id            = LV1.Id,
                    Label         = LV1.Label,
                    Icon          = LV1.Icon,
                    Path          = LV1.Path,
                    MenuType      = LV1.MenuType,
                    CanCreate     = LV1.CanCreate,
                    CanUpdate     = LV1.CanUpdate,
                    CanDelete     = LV1.CanDelete,
                    ActiveKey     = LV1.ActiveKey,
                    ShowIndicator = LV1.ShowIndicator,
                    ShowIndex     = LV1.ShowIndex,
                    Sequence      = LV1.Sequence,
                    Items         = LV1.Items is null ? null : [..
                        from LV2 in GetLevel2(tblRolesPage, LV1, languageId)

                        select new NavigationDTO
                        {
                            Id            = LV2.Id,
                            Label         = LV2.Label,
                            Icon          = LV2.Icon,
                            Path          = LV2.Path,
                            MenuType      = LV2.MenuType,
                            CanCreate     = LV2.CanCreate,
                            CanUpdate     = LV2.CanUpdate,
                            CanDelete     = LV2.CanDelete,
                            ActiveKey     = LV2.ActiveKey,
                            ShowIndicator = LV2.ShowIndicator,
                            ShowIndex     = LV2.ShowIndex,
                            Sequence      = LV2.Sequence,
                            Items         = LV2.Items is null ? null : [..
                                from LV3 in GetLevel3(tblRolesPage, LV2, languageId)

                                select new NavigationDTO
                                {
                                    Id            = LV3.Id,
                                    Label         = LV3.Label,
                                    Icon          = LV3.Icon,
                                    Path          = LV3.Path,
                                    MenuType      = LV3.MenuType,
                                    CanCreate     = LV3.CanCreate,
                                    CanUpdate     = LV3.CanUpdate,
                                    CanDelete     = LV3.CanDelete,
                                    ActiveKey     = LV3.ActiveKey,
                                    ShowIndicator = LV3.ShowIndicator,
                                    ShowIndex     = LV3.ShowIndex,
                                    Sequence      = LV3.Sequence,
                                    Items         = null
                                }
                            ]
                        }
                    ],
                }
            ];

            return root;
        }


        private static List<NavigationDTO> GetLevel1(IEnumerable<TblRolesPage> tblRolesPage, string languageId = LANGUAGE.ENGLISH.Id) =>
        [..
            (from PAGE in tblRolesPage.Where(x => x.Page.ModuleId is null)

            select new NavigationDTO
            {
                Id            = PAGE.Page.Id,
                Label         = GetLanguage(languageId, PAGE.Page.Translatory),
                Icon          = PAGE.Page.Icon,
                Path          = PAGE.Page.Path,
                MenuType      = "PAGE",
                CanCreate     = PAGE.CanCreate,
                CanUpdate     = PAGE.CanUpdate,
                CanDelete     = PAGE.CanDelete,
                ActiveKey     = PAGE.Page.ActiveKey,
                ShowIndicator = false,
                ShowIndex     = PAGE.Page.ShowIndex,
                Sequence      = PAGE.Page.Sequence,
                Items         = null,
            })
            .Concat(
                from MODULE in tblRolesPage
                .Where(x => x.Page.ModuleId is not null)
                .GroupBy(x => x.Page.ModuleId)
                .Select(x => x.First().Page.Module)

                select new NavigationDTO
                {
                    Id            = MODULE.Id,
                    Label         = GetLanguage(languageId, MODULE.Translatory),
                    Icon          = MODULE.Icon,
                    Path          = null,
                    MenuType      = MODULE.MenuType.Name,
                    CanCreate     = false,
                    CanUpdate     = false,
                    CanDelete     = false,
                    ActiveKey     = null,
                    ShowIndicator = MODULE.ShowIndicator,
                    ShowIndex     = MODULE.ShowIndex,
                    Sequence      = MODULE.Sequence,
                    Items         = [],
                }
            ).OrderBy(x => x.Sequence)
        ];


        private static List<NavigationDTO> GetLevel2(IEnumerable<TblRolesPage> tblRolesPage, NavigationDTO module, string languageId = LANGUAGE.ENGLISH.Id) =>
        [..
            (from PAGE in tblRolesPage.Where(x => x.Page.ModuleId == module.Id && x.Page.SubmoduleId is null)

            select new NavigationDTO
            {
                Id            = PAGE.Page.Id,
                Label         = GetLanguage(languageId, PAGE.Page.Translatory),
                Icon          = PAGE.Page.Icon,
                Path          = PAGE.Page.Path,
                MenuType      = "PAGE",
                CanCreate     = PAGE.CanCreate,
                CanUpdate     = PAGE.CanUpdate,
                CanDelete     = PAGE.CanDelete,
                ActiveKey     = PAGE.Page.ActiveKey,
                ShowIndicator = false,
                ShowIndex     = PAGE.Page.ShowIndex,
                Sequence      = PAGE.Page.Sequence,
                Items         = null,
            })
            .Concat(
                from SUBMODULE in tblRolesPage
                .Where(x => x.Page.ModuleId == module.Id && x.Page.SubmoduleId is not null)
                .GroupBy(x => x.Page.SubmoduleId)
                .Select(g => g.First().Page.Submodule)

                select new NavigationDTO
                {
                    Id            = SUBMODULE.Id,
                    Label         = GetLanguage(languageId, SUBMODULE.Translatory),
                    Icon          = SUBMODULE.Icon,
                    Path          = null,
                    MenuType      = SUBMODULE.MenuType.Name,
                    CanCreate     = false,
                    CanUpdate     = false,
                    CanDelete     = false,
                    ActiveKey     = null,
                    ShowIndicator = SUBMODULE.ShowIndicator,
                    ShowIndex     = SUBMODULE.ShowIndex,
                    Sequence      = SUBMODULE.Sequence,
                    Items         = [],
                }
            ).OrderBy(x => x.Sequence)
        ];


        private static List<NavigationDTO> GetLevel3(IEnumerable<TblRolesPage> tblRolesPage, NavigationDTO submodule, string languageId = LANGUAGE.ENGLISH.Id) =>
        [..
            (from PAGE in tblRolesPage.Where(x => x.Page.ModuleId is not null && x.Page.SubmoduleId == submodule.Id)

            select new NavigationDTO
            {
                Id            = PAGE.Page.Id,
                Label         = GetLanguage(languageId, PAGE.Page.Translatory),
                Icon          = PAGE.Page.Icon,
                Path          = PAGE.Page.Path,
                MenuType      = "PAGE",
                CanCreate     = PAGE.CanCreate,
                CanUpdate     = PAGE.CanUpdate,
                CanDelete     = PAGE.CanDelete,
                ActiveKey     = PAGE.Page.ActiveKey,
                ShowIndicator = false,
                ShowIndex     = PAGE.Page.ShowIndex,
                Sequence      = PAGE.Page.Sequence,
                Items         = null,
            }).OrderBy(x => x.Sequence)
        ];


        private static string GetLanguage(string languageId, TblTranslatory translatory) {
            return languageId switch
            {
                LANGUAGE.SPANISH.Id => string.IsNullOrWhiteSpace(translatory.Spanish) ? translatory.English : translatory.Spanish,
                LANGUAGE.KOREAN.Id  => string.IsNullOrWhiteSpace(translatory.Korean)  ? translatory.English : translatory.Korean,
                _ => translatory.English
            }; 
        }
        #endregion


        #region UpdateLevel
        public async Task<ResponseDTO> UpdateLevel1(int projectId, List<NavigationDTO> navigation)
        {
            ResponseDTO response = new();

            try
            {
                IEnumerable<TblProjectsModule> tblProjectsModule =
                    from modules in navigation

                    join entity in await _moduleRepository.GetProjectModuleList(x => x.ProjectId == projectId)
                    on modules.Id equals entity.Id
                    into entityJOIN
                    from entity in entityJOIN

                    where modules.Items is not null
                        && string.IsNullOrWhiteSpace(modules.Path)

                    select new TblProjectsModule
                    {
                        Id       = entity.Id, 
                        Sequence = modules.Sequence
                    };

                IEnumerable<TblProjectsPage> tblProjectsPage =
                    from pages in navigation

                    join entity in await _pageRepository.GetProjectPageList(x => x.ProjectId == projectId && x.ModuleId == null && x.SubmoduleId == null)
                    on pages.Id equals entity.Id
                    into entityJOIN
                    from entity in entityJOIN

                    where pages.Items is null
                        && !string.IsNullOrWhiteSpace(pages.Path)

                    select new TblProjectsPage
                    {
                        Id       = entity.Id,
                        Sequence = pages.Sequence
                    };

                tblProjectsModule = Clean.NoNesting(tblProjectsModule);
                await _moduleRepository.UpdateProjectModuleSequence(tblProjectsModule);

                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
                await _pageRepository.UpdateProjectPageSequence(tblProjectsPage);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO> UpdateLevel2(int projectId, int moduleId, List<NavigationDTO> navigation)
        {
            ResponseDTO response = new();

            try
            {
                IEnumerable<TblProjectsSubmodule> tblProjectsSubmodule =
                    from submodules in navigation

                    join entity in await _submoduleRepository.GetProjectSubmoduleList(x => x.ModuleId == moduleId)
                    on submodules.Id equals entity.Id
                    into entityJOIN
                    from entity in entityJOIN

                    where submodules.Items is not null
                        && string.IsNullOrWhiteSpace(submodules.Path)

                    select new TblProjectsSubmodule
                    {
                        Id       = entity.Id, 
                        Sequence = submodules.Sequence
                    };

                IEnumerable<TblProjectsPage> tblProjectsPage =
                    from pages in navigation

                    join entity in await _pageRepository.GetProjectPageList(x => x.ProjectId == projectId && x.ModuleId == moduleId && x.SubmoduleId == null)
                    on pages.Id equals entity.Id
                    into entityJOIN
                    from entity in entityJOIN

                    where pages.Items is null
                        && !string.IsNullOrWhiteSpace(pages.Path)

                    select new TblProjectsPage
                    {
                        Id       = entity.Id, 
                        Sequence = pages.Sequence
                    };

                tblProjectsSubmodule = Clean.NoNesting(tblProjectsSubmodule);
                await _submoduleRepository.UpdateProjectSubmoduleSequence(tblProjectsSubmodule);

                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
                await _pageRepository.UpdateProjectPageSequence(tblProjectsPage);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO> UpdateLevel3(int projectId, int moduleId, int submoduleId, List<NavigationDTO> navigation)
        {
            ResponseDTO response = new();

            try
            {
                IEnumerable<TblProjectsPage> tblProjectsPage =
                    from pages in navigation

                    join entity in await _pageRepository.GetProjectPageList(x => x.ProjectId == projectId && x.ModuleId == moduleId && x.SubmoduleId == submoduleId)
                    on pages.Id equals entity.Id
                    into entityJOIN
                    from entity in entityJOIN

                    where pages.Items is null
                        && !string.IsNullOrWhiteSpace(pages.Path)

                    select new TblProjectsPage
                    {
                        Id       = entity.Id,
                        Sequence = pages.Sequence
                    };

                tblProjectsPage = Clean.NoNesting(tblProjectsPage);
                await _pageRepository.UpdateProjectPageSequence(tblProjectsPage);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
        #endregion
    }
}