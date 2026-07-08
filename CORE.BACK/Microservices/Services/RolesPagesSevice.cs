using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Repositories.Database;
using Repositories.Interfaces;

namespace Microservices.Services
{
    public class RolesPagesSevice(
        IRolesPagesRepository _rolesPagesRepository,
        IMapper _mapper
    ) : IRolesPagesSevice { 


        public async Task<ResponseList<RolePageDTO>> GetRolePageList(int roleId, bool onlyActive = true)
        {
            ResponseList<RolePageDTO> response = new();

            try
            {
                List<TblRolesPage> entities = await _rolesPagesRepository.GetRolePageList(x 
                    => x.RoleId == roleId
                    && (!onlyActive || x.Page.IsActive)
                );                

                //Response
                response.Data = _mapper.Map< List<RolePageDTO>>(entities);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<RolePageDTO>> CreateRolePage(int roleId, List<int> pageIdList)
        {
            ResponseList<RolePageDTO> response = new();

            try
            {
                List<TblRolesPage> tblRolesPage = await _rolesPagesRepository.GetRolePageList(x => x.RoleId == roleId);

                List<TblRolesPage> entities = [.. 
                    pageIdList
                    .Except(tblRolesPage.Select(e => e.PageId))
                    .Select(pageId => new TblRolesPage 
                    {
                        Id = 0,
                        RoleId = roleId,
                        PageId = pageId,
                        CanCreate = false,
                        CanUpdate = false,
                        CanDelete = false
                    }
                )];

                entities = await _rolesPagesRepository.CreateRolePage(entities);
                response.Data = _mapper.Map<List<RolePageDTO>>(entities);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 


        public async Task<ResponseDTO<RolePageDTO>> PatchRolePage(int rolePageId, JsonPatchDocument patch)
        {
            ResponseDTO<RolePageDTO> response = new();

            try
            {
                //Get
                TblRolesPage entity = await _rolesPagesRepository.GetRolePageBy(x => x.Id == rolePageId);

                if (entity is null)
                    return response.NotFound();

                //Mapping
                patch.ApplyTo(entity);

                //Exists?
                if (await _rolesPagesRepository.ExistsRolePage(x 
                    => x.Id != entity.Id 
                    && x.PageId == entity.PageId
                    && x.RoleId == entity.RoleId)
                ) return response.Conflict($"Page already assigned");

                //Update
                entity = Clean.NoNesting(entity);
                entity = await _rolesPagesRepository.UpdateRolePage(entity);

                //Response
                response.Data = _mapper.Map<RolePageDTO>(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseDTO> DeleteRolePage(int rolePageId)
        {
            ResponseDTO response = new();

            try
            {
                //Get
                TblRolesPage entity = await _rolesPagesRepository.GetRolePageBy(x => x.Id == rolePageId);

                if (entity is null)
                    return response.NotFound();

                //Delete
                entity = Clean.NoNesting(entity);
                await _rolesPagesRepository.DeleteRolePage(entity);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 