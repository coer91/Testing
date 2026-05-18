using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblProjectsSubmodule
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Icon { get; set; }

    public int ModuleId { get; set; }

    public int MenuTypeId { get; set; }

    public bool ShowIndicator { get; set; }

    public int Sequence { get; set; }

    public virtual TblProjectsMenuType MenuType { get; set; }

    public virtual TblProjectsModule Module { get; set; }

    public virtual ICollection<TblProjectsPage> TblProjectsPages { get; set; } = new List<TblProjectsPage>();
}
