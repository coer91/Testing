using Microsoft.AspNetCore.JsonPatch; 
using HWMX.DotNet;

namespace Microservices.Interfaces
{
	public interface IRolesService
	{
		Task<ResponseDTO<OptionDTO>> GetRoleById(int roleId);
		Task<ResponseList<OptionDTO>> GetRoleList(bool onlyActive = true);
		Task<ResponseDTO<OptionDTO>> CreateRole(OptionDTO roleDTO);
		Task<ResponseDTO<OptionDTO>> UpdateRole(OptionDTO roleDTO);
		Task<ResponseDTO<OptionDTO>> PatchRole(int roleId, JsonPatchDocument patch);
		Task<ResponseDTO<OptionDTO>> DeleteRole(int roleId);
	}
}