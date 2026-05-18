using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblProjectsPage
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Path { get; set; }

    public string Icon { get; set; }

    public int ProjectId { get; set; }

    public int? ModuleId { get; set; }

    public int? SubmoduleId { get; set; }

    public bool IsActive { get; set; }

    public string ActiveKey { get; set; }

    public int Sequence { get; set; }

    public virtual TblProjectsModule Module { get; set; }

    public virtual TblProject Project { get; set; }

    public virtual TblProjectsSubmodule Submodule { get; set; }

    public virtual ICollection<TblRolesPage> TblRolesPages { get; set; } = new List<TblRolesPage>();
}
