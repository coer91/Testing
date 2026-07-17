using Microsoft.EntityFrameworkCore; 

namespace Repositories.Database
{
    public class HWMENMESContext(DbContextOptions<HWMENMESContext> options) : DbContext(options)
    {        
        public virtual DbSet<MES_INV_LOT_INSP_DA> MES_INV_LOT_INSP_DA { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder) { 
            modelBuilder.Entity<MES_INV_LOT_INSP_DA>(entity => entity.HasKey(x => x.INSP_NO)); 
        }
    }
}