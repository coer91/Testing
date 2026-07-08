using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblTranslatory
{
    public int Id { get; set; }

    public string English { get; set; }

    public string Spanish { get; set; }

    public string Korean { get; set; }

    public virtual TblProjectsModule TblProjectsModule { get; set; }

    public virtual TblProjectsPage TblProjectsPage { get; set; }

    public virtual TblProjectsSubmodule TblProjectsSubmodule { get; set; }
}
