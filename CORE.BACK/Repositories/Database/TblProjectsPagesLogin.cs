using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblProjectsPagesLogin
{
    public string Id { get; set; }

    public string User { get; set; }

    public string Role { get; set; }

    public string ActiveKey { get; set; }

    public string Page { get; set; }

    public int Sequence { get; set; }

    public string ModuleKey { get; set; }

    public string Module { get; set; }

    public int ModuleSequence { get; set; }

    public string SubmoduleKey { get; set; }

    public string Submodule { get; set; }

    public int SubmoduleSequence { get; set; }

    public string Language { get; set; }
}
