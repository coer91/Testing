using Repositories.Interfaces;
using Repositories.Database;
using Microservices.Interfaces;
using AutoMapper;
using HWMX.DotNet;

namespace Microservices.Services
{
    public class ProjectsService(IProjectsRepository _projectRepository, IMapper _mapper) : ProjectsIService
    {

        public async Task<ResponseList<OptionDTO>> GetMenuTypeList()
        {
            ResponseList<OptionDTO> response = new();

            try
            {
                List<TblProjectsMenuType> tblProjectsMenuType = await _projectRepository.GetMenuTypeList(x => true);
                response.Data = _mapper.Map<List<OptionDTO>>(tblProjectsMenuType);
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }


        public async Task<ResponseList<OptionDTO>> GetProjectList()
        { 
            ResponseList<OptionDTO> response = new();

            try
            {
                List<TblProject> tblProject = await _projectRepository.GetProjectList(x => true);
                response.Data = _mapper.Map<List<OptionDTO>>(tblProject);
                response.Data = [.. response.Data.OrderBy(x => x.Id)];
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
} 