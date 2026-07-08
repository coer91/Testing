using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Database;

public partial class HWMXCoreContext : DbContext
{
    public HWMXCoreContext(DbContextOptions<HWMXCoreContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblLanguage> TblLanguages { get; set; }

    public virtual DbSet<TblPartner> TblPartners { get; set; }

    public virtual DbSet<TblProject> TblProjects { get; set; }

    public virtual DbSet<TblProjectsMenuType> TblProjectsMenuTypes { get; set; }

    public virtual DbSet<TblProjectsModule> TblProjectsModules { get; set; }

    public virtual DbSet<TblProjectsPage> TblProjectsPages { get; set; }

    public virtual DbSet<TblProjectsSubmodule> TblProjectsSubmodules { get; set; }

    public virtual DbSet<TblRole> TblRoles { get; set; }

    public virtual DbSet<TblRolesPage> TblRolesPages { get; set; }

    public virtual DbSet<TblTranslatory> TblTranslatories { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    public virtual DbSet<TblUsersImage> TblUsersImages { get; set; }

    public virtual DbSet<TblUsersPassword> TblUsersPasswords { get; set; }

    public virtual DbSet<TblUsersRole> TblUsersRoles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblLanguage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblLanguages_Id");

            entity.HasIndex(e => e.Name, "UN_TblLanguages_Name").IsUnique();

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<TblPartner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblPartners_Id");

            entity.HasIndex(e => e.Name, "UN_TblPartners_Name").IsUnique();

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblProject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblProjects_Id");

            entity.HasIndex(e => e.Name, "UN_TblProjects_Name").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblProjectsMenuType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblProjectsMenuType_Id");

            entity.ToTable("TblProjectsMenuType");

            entity.HasIndex(e => e.Name, "UN_TblProjectsMenuType_Name").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(5)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblProjectsModule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblProjectsModules_Id");

            entity.HasIndex(e => e.TranslatoryId, "UN_TblProjectsModules_TranslatoryId").IsUnique();

            entity.Property(e => e.Icon)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.MenuTypeId).HasDefaultValue(1);
            entity.Property(e => e.ShowIndicator).HasDefaultValue(true);

            entity.HasOne(d => d.MenuType).WithMany(p => p.TblProjectsModules)
                .HasForeignKey(d => d.MenuTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsModules_MenuTypeId");

            entity.HasOne(d => d.Project).WithMany(p => p.TblProjectsModules)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsModules_ProjectId");

            entity.HasOne(d => d.Translatory).WithOne(p => p.TblProjectsModule)
                .HasForeignKey<TblProjectsModule>(d => d.TranslatoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsModules_TranslatoryId");
        });

        modelBuilder.Entity<TblProjectsPage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblProjectsPages_Id");

            entity.HasIndex(e => e.ActiveKey, "UN_TblProjectsPages_ActiveKey").IsUnique();

            entity.HasIndex(e => new { e.ProjectId, e.ModuleId, e.SubmoduleId, e.TranslatoryId }, "UN_TblProjectsPages_ProjectId_ModuleId_SubmoduleId_TranslatoryId").IsUnique();

            entity.HasIndex(e => e.TranslatoryId, "UN_TblProjectsPages_TranslatoryId").IsUnique();

            entity.Property(e => e.ActiveKey)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Icon)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Path)
                .IsRequired()
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Module).WithMany(p => p.TblProjectsPages)
                .HasForeignKey(d => d.ModuleId)
                .HasConstraintName("FK_TblProjectsPages_ModuleId");

            entity.HasOne(d => d.Project).WithMany(p => p.TblProjectsPages)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsPages_ProjectId");

            entity.HasOne(d => d.Submodule).WithMany(p => p.TblProjectsPages)
                .HasForeignKey(d => d.SubmoduleId)
                .HasConstraintName("FK_TblProjectsPages_SubmoduleId");

            entity.HasOne(d => d.Translatory).WithOne(p => p.TblProjectsPage)
                .HasForeignKey<TblProjectsPage>(d => d.TranslatoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsPages_TranslatoryId");
        });

        modelBuilder.Entity<TblProjectsSubmodule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblProjectsSubmodules_Id");

            entity.HasIndex(e => e.TranslatoryId, "UN_TblProjectsSubmodules_TranslatoryId").IsUnique();

            entity.Property(e => e.Icon)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.MenuTypeId).HasDefaultValue(1);
            entity.Property(e => e.ShowIndicator).HasDefaultValue(true);

            entity.HasOne(d => d.MenuType).WithMany(p => p.TblProjectsSubmodules)
                .HasForeignKey(d => d.MenuTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsSubmodules_MenuTypeId");

            entity.HasOne(d => d.Module).WithMany(p => p.TblProjectsSubmodules)
                .HasForeignKey(d => d.ModuleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsSubmodules_ModuleId");

            entity.HasOne(d => d.Translatory).WithOne(p => p.TblProjectsSubmodule)
                .HasForeignKey<TblProjectsSubmodule>(d => d.TranslatoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblProjectsSubmodules_TranslatoryId");
        });

        modelBuilder.Entity<TblRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblRoles_Id");

            entity.HasIndex(e => e.Name, "UN_TblRoles_Name").IsUnique();

            entity.Property(e => e.About)
                .HasMaxLength(2000)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(80)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblRolesPage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblRolesPages_Id");

            entity.HasIndex(e => new { e.RoleId, e.PageId }, "UN_TblRolesPages_RoleId_PageId").IsUnique();

            entity.HasOne(d => d.Page).WithMany(p => p.TblRolesPages)
                .HasForeignKey(d => d.PageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblRolesPages_PageId");

            entity.HasOne(d => d.Role).WithMany(p => p.TblRolesPages)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblRolesPages_RoleId");
        });

        modelBuilder.Entity<TblTranslatory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblTranslatory_Id");

            entity.ToTable("TblTranslatory");

            entity.HasIndex(e => e.English, "UN_TblTranslatory_English").IsUnique();

            entity.Property(e => e.English)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Korean).HasMaxLength(100);
            entity.Property(e => e.Spanish).HasMaxLength(100);
        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblUsers_Id");

            entity.HasIndex(e => e.User, "UK_TblUsers_User").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.LanguageId)
                .IsRequired()
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("en_US");
            entity.Property(e => e.User)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Language).WithMany(p => p.TblUsers)
                .HasForeignKey(d => d.LanguageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblUsers_LanguageId");

            entity.HasOne(d => d.Partner).WithMany(p => p.TblUsers)
                .HasForeignKey(d => d.PartnerId)
                .HasConstraintName("FK_TblUsers_PartnerId");
        });

        modelBuilder.Entity<TblUsersImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblImages_Id");

            entity.HasIndex(e => new { e.UserId, e.IsMain }, "UN_TblImages_UserId_IsMain").IsUnique();

            entity.HasIndex(e => new { e.UserId, e.Name }, "UN_TblImages_UserId_Name").IsUnique();

            entity.Property(e => e.Extension)
                .IsRequired()
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.TblUsersImages)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblImages_UserId");
        });

        modelBuilder.Entity<TblUsersPassword>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblUsersPassword_Id");

            entity.ToTable("TblUsersPassword");

            entity.HasIndex(e => e.UserId, "UN_TblUsersPassword_UserId").IsUnique();

            entity.Property(e => e.Expiration).HasColumnType("datetime");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Salt)
                .IsRequired()
                .HasMaxLength(16);
            entity.Property(e => e.Temporary).HasMaxLength(50);

            entity.HasOne(d => d.User).WithOne(p => p.TblUsersPassword)
                .HasForeignKey<TblUsersPassword>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblUsersPassword_UserId");
        });

        modelBuilder.Entity<TblUsersRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TblUsersRoles_Id");

            entity.HasIndex(e => new { e.UserId, e.RoleId }, "UN_TblUsersRoles_UserId_RoleId").IsUnique();

            entity.HasIndex(e => new { e.UserId, e.RoleId, e.IsMain }, "UN_TblUsersRoles_UserId_RoleId_IsMain").IsUnique();

            entity.HasOne(d => d.Role).WithMany(p => p.TblUsersRoles)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblUsersRoles_RoleId");

            entity.HasOne(d => d.User).WithMany(p => p.TblUsersRoles)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblUsersRoles_UserId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
