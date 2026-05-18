using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblUsersRole
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int RoleId { get; set; }

    public bool IsMain { get; set; }

    public virtual TblRole Role { get; set; }

    public virtual TblUser User { get; set; }
}
