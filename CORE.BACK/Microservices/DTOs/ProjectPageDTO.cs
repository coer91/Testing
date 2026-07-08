using HWMX.DotNet;
using HWMX.DotNet.DTOs;

namespace Microservices.DTOs
{
    public class ProjectPageDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Path { get; set; }

        public string Icon { get; set; }

        public int ProjectId { get; set; }

        public string Project { get; set; }

        public int? ModuleId { get; set; }

        public string Module { get; set; }

        public int? SubmoduleId { get; set; }

        public string Submodule { get; set; }

        public bool IsActive { get; set; }

        public string ActiveKey { get; set; }

        public bool ShowIndex { get; set; }

        public int Sequence { get; set; }

        public TranslatoryDTO Translatory { get; set; }

        public List<OptionDTO> Roles { get; set; } = [];
    }
}