using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblProjectsMenuType
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<TblProjectsModule> TblProjectsModules { get; set; } = new List<TblProjectsModule>();

    public virtual ICollection<TblProjectsSubmodule> TblProjectsSubmodules { get; set; } = new List<TblProjectsSubmodule>();
}
