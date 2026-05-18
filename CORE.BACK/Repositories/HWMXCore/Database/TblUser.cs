using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblUser
{
    public int Id { get; set; }

    public string User { get; set; }

    public int? PartnerId { get; set; }

    public string Email { get; set; }

    public virtual TblPartner Partner { get; set; }

    public virtual ICollection<TblUsersImage> TblUsersImages { get; set; } = new List<TblUsersImage>();

    public virtual TblUsersPassword TblUsersPassword { get; set; }

    public virtual ICollection<TblUsersRole> TblUsersRoles { get; set; } = new List<TblUsersRole>();
}
