using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblRole
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool IsActive { get; set; }

    public string About { get; set; }

    public virtual ICollection<TblRolesPage> TblRolesPages { get; set; } = new List<TblRolesPage>();

    public virtual ICollection<TblUsersRole> TblUsersRoles { get; set; } = new List<TblUsersRole>();
}
