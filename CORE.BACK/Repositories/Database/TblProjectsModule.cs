using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblProjectsModule
{
    public int Id { get; set; }

    public int TranslatoryId { get; set; }

    public string Icon { get; set; }

    public int ProjectId { get; set; }

    public int MenuTypeId { get; set; }

    public bool ShowIndicator { get; set; }

    public bool ShowIndex { get; set; }

    public int Sequence { get; set; }

    public virtual TblProjectsMenuType MenuType { get; set; }

    public virtual TblProject Project { get; set; }

    public virtual ICollection<TblProjectsPage> TblProjectsPages { get; set; } = new List<TblProjectsPage>();

    public virtual ICollection<TblProjectsSubmodule> TblProjectsSubmodules { get; set; } = new List<TblProjectsSubmodule>();

    public virtual TblTranslatory Translatory { get; set; }
}
