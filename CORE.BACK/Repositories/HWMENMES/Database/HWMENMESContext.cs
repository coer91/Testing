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
        public virtual DbSet<MES_DEPT_MA> MES_DEPT_MA { get; set; }
        public virtual DbSet<MES_RACK_LOC_MA> MES_RACK_LOC_MA { get; set; }
        public virtual DbSet<MES_RACK_LOC_PART_MA> MES_RACK_LOC_PART_MA { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ESAAUMM>(entity => entity.HasKey(x => x.MENU_CD));
            modelBuilder.Entity<ESAAURF>(entity => entity.HasKey(x => new { x.ROLE_CD, x.FUNC_CD, x.MENU_CD }));
            modelBuilder.Entity<ESAAURP>(entity => entity.HasKey(x => new { x.USR_ID, x.ROLE_CD }));
            modelBuilder.Entity<ESAUSER>(entity => entity.HasKey(x => x.USR_ID));
            modelBuilder.Entity<ESFRSLN>(entity => entity.HasKey(x => new { x.ORIGIN, x.BUNDLE_NAME, x.LOCALE }));
            modelBuilder.Entity<MES_DEPT_MA>(entity => entity.HasKey(x => new { x.ORG_CD, x.EMP_GRP_CD, x.EMP_SUBG_CD }));
            modelBuilder.Entity<MES_RACK_LOC_MA>(entity => entity.HasKey(x => x.LOC_NO));
            modelBuilder.Entity<MES_RACK_LOC_PART_MA>(entity => entity.HasKey(x => new { x.LOC_NO, x.PART_NO })); 
        }
    }
}