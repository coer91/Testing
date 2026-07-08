using System;
using System.Collections.Generic;

namespace Repositories.Database;

public partial class TblUsersPassword
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Password { get; set; }

    public byte[] Salt { get; set; }

    public string Temporary { get; set; }

    public DateTime? Expiration { get; set; }

    public virtual TblUser User { get; set; }
}
