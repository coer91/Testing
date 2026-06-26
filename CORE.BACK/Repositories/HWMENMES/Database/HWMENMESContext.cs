using Microsoft.EntityFrameworkCore;
namespace Repositories.HWMENMES.Database
{
    public class HWMENMESContext(DbContextOptions<HWMENMESContext> options) : DbContext(options)
    {
        public virtual DbSet<ESAAUMM> ESAAUMM { get; set; }
        public virtual DbSet<ESAAURF> ESAAURF { get; set; }
        public virtual DbSet<ESAAURP> ESAAURP { get; set; }
        public virtual DbSet<ESAUSER> ESAUSER { get; set; }
        public virtual DbSet<ESFRSLN> ESFRSLN { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ESAAUMM>(entity => entity.HasKey(x => x.MENU_CD));
            modelBuilder.Entity<ESAAURF>(entity => entity.HasKey(x => new { x.ROLE_CD, x.FUNC_CD, x.MENU_CD }));
            modelBuilder.Entity<ESAAURP>(entity => entity.HasKey(x => new { x.USR_ID, x.ROLE_CD }));
            modelBuilder.Entity<ESAUSER>(entity => entity.HasKey(x => x.USR_ID));
            modelBuilder.Entity<ESFRSLN>(entity => entity.HasKey(x => new { x.ORIGIN, x.BUNDLE_NAME, x.LOCALE }));
        }
    }
}