using System;
using System.Collections.Generic;

namespace Repositories.HWMXCore.Database;

public partial class TblUsersImage
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Name { get; set; }

    public string Extension { get; set; }

    public bool IsMain { get; set; }

    public byte[] Image { get; set; }

    public virtual TblUser User { get; set; }
}
