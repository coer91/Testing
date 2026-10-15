using Microsoft.EntityFrameworkCore;

namespace Repositories.Database
{
    public class HWMENMESContext(DbContextOptions<HWMENMESContext> options) : DbContext(options) { }
}