using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblLanguage
{
    public string Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<TblUser> TblUsers { get; set; } = new List<TblUser>();
}
