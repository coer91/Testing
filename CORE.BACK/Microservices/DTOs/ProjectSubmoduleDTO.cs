namespace Microservices.DTOs
{
    public class ProjectSubmoduleDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public int ProjectId { get; set; }

        public string Project { get; set; }

        public int ModuleId { get; set; }

        public string Module { get; set; }

        public int MenuTypeId { get; set; }

        public string MenuType { get; set; }

        public bool ShowIndicator { get; set; }

        public int Sequence { get; set; }

        public List<ProjectPageDTO> Pages { get; set; } = [];
    }
}