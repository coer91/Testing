using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblPartner
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<TblUser> TblUsers { get; set; } = new List<TblUser>();
}
