using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblProjectsSubmodule
{
    public int Id { get; set; }

    public int TranslatoryId { get; set; }

    public string Icon { get; set; }

    public int ModuleId { get; set; }

    public int MenuTypeId { get; set; }

    public bool ShowIndicator { get; set; }

    public bool ShowIndex { get; set; }

    public int Sequence { get; set; }

    public virtual TblProjectsMenuType MenuType { get; set; }

    public virtual TblProjectsModule Module { get; set; }

    public virtual ICollection<TblProjectsPage> TblProjectsPages { get; set; } = new List<TblProjectsPage>();

    public virtual TblTranslatory Translatory { get; set; }
}
