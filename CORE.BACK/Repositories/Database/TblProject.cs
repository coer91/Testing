using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblProject
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<TblProjectsModule> TblProjectsModules { get; set; } = new List<TblProjectsModule>();

    public virtual ICollection<TblProjectsPage> TblProjectsPages { get; set; } = new List<TblProjectsPage>();
}
