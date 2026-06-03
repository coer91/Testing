using Microsoft.EntityFrameworkCore; 
using Repositories.HWMXCore.Database;
using Repositories.HWMXCore.Interfaces;
using System.Linq.Expressions;
 
namespace Repositories.HWMXCore.Repository
{
	public class ProjectsRepository(HWMXCoreContext _context) : IProjectsRepository
	{

        public async Task<List<TblProjectsMenuType>> GetMenuTypeList(Expression<Func<TblProjectsMenuType, bool>> expression)
           => await _context.TblProjectsMenuTypes
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();


        public async Task<TblProject> GetProjectBy(Expression<Func<TblProject, bool>> expression)
            => await _context.TblProjects 
                .Include(x => x.TblProjectsPages).ThenInclude(x => x.Module).ThenInclude(x => x.MenuType)
                .Include(x => x.TblProjectsPages).ThenInclude(x => x.Submodule).ThenInclude(x => x.MenuType)
                .Where(expression)
                .AsNoTracking()
                .FirstOrDefaultAsync();


        public async Task<List<TblProject>> GetProjectList(Expression<Func<TblProject, bool>> expression)
		    => await _context.TblProjects
				.Where(expression)
				.AsNoTracking()
				.ToListAsync(); 


        public async Task<List<TblRolesPage>> GetNavigationByUser(int projectId, int userId)
        {
            return await (
                from tblUsersRoles in _context.TblUsersRoles
                where tblUsersRoles.UserId == userId

                join tblRolesPages in _context.TblRolesPages 
                on tblUsersRoles.RoleId equals tblRolesPages.RoleId
                into tblRolesPagesJOIN         
                from tblRolesPages in tblRolesPagesJOIN
                where tblRolesPages.Page.ProjectId == projectId
                   && tblRolesPages.Page.IsActive == true
                   && tblRolesPages.Role.IsActive == true

                group tblRolesPages by tblRolesPages.PageId  
                into groupRolesPages

                select new TblRolesPage 
                {
                    Id        = groupRolesPages.FirstOrDefault().Id,
                    RoleId    = groupRolesPages.First().RoleId,
                    PageId    = groupRolesPages.First().PageId,
                    CanCreate = groupRolesPages.Any(x => x.CanCreate),
                    CanUpdate = groupRolesPages.Any(x => x.CanUpdate),
                    CanDelete = groupRolesPages.Any(x => x.CanDelete), 
                    Page      = new TblProjectsPage {
                        Id          = groupRolesPages.First().Page.Id,
                        Name        = groupRolesPages.First().Page.Name,
                        Path        = groupRolesPages.First().Page.Path,
                        Icon        = groupRolesPages.First().Page.Icon,
                        ProjectId   = groupRolesPages.First().Page.ProjectId,
                        ModuleId    = groupRolesPages.First().Page.ModuleId,
                        SubmoduleId = groupRolesPages.First().Page.SubmoduleId,
                        IsActive    = groupRolesPages.First().Page.IsActive,
                        ActiveKey   = groupRolesPages.First().Page.ActiveKey,
                        ShowIndex   = groupRolesPages.First().Page.ShowIndex,
                        Sequence    = groupRolesPages.First().Page.Sequence, 
                        Project     = groupRolesPages.First().Page.Project, 
                        Module      = groupRolesPages.First().Page.Module != null ? new TblProjectsModule {
                            Id            = groupRolesPages.First().Page.Module.Id,
                            Name          = groupRolesPages.First().Page.Module.Name,
                            Icon          = groupRolesPages.First().Page.Module.Icon,
                            ProjectId     = groupRolesPages.First().Page.Module.ProjectId,
                            MenuTypeId    = groupRolesPages.First().Page.Module.MenuTypeId,
                            ShowIndicator = groupRolesPages.First().Page.Module.ShowIndicator,
                            ShowIndex     = groupRolesPages.First().Page.Module.ShowIndex,
                            Sequence      = groupRolesPages.First().Page.Module.Sequence,
                            MenuType      = groupRolesPages.First().Page.Module.MenuType
                        } : null, 
                        Submodule   = groupRolesPages.First().Page.Submodule != null ? new TblProjectsSubmodule
                        {
                            Id            = groupRolesPages.First().Page.Submodule.Id,
                            Name          = groupRolesPages.First().Page.Submodule.Name,
                            Icon          = groupRolesPages.First().Page.Submodule.Icon,
                            ModuleId      = groupRolesPages.First().Page.Submodule.ModuleId,
                            MenuTypeId    = groupRolesPages.First().Page.Submodule.MenuTypeId,
                            ShowIndicator = groupRolesPages.First().Page.Submodule.ShowIndicator,
                            ShowIndex     = groupRolesPages.First().Page.Submodule.ShowIndex,
                            Sequence      = groupRolesPages.First().Page.Submodule.Sequence,
                            MenuType      = groupRolesPages.First().Page.Submodule.MenuType
                        } : null,
                    },
                    Role = groupRolesPages.First().Role
                }
            ) 
            .AsNoTracking()
            .ToListAsync();
        } 
    }
}