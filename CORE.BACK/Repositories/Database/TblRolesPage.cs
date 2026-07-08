using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblRolesPage
{
    public int Id { get; set; }

    public int RoleId { get; set; }

    public int PageId { get; set; }

    public bool CanCreate { get; set; }

    public bool CanUpdate { get; set; }

    public bool CanDelete { get; set; }

    public virtual TblProjectsPage Page { get; set; }

    public virtual TblRole Role { get; set; }
}
