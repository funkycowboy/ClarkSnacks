using System;
using ClarkSnacks.MTS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClarkSnacks.MTS.EntityFramework.Context
{
    public class MTSDbContext : DbContext
    {
        public virtual DbSet<Inspection> Inspections { get; set; }
        public virtual DbSet<InspectionItem> InspectionItems { get; set; }
        public virtual DbSet<InspectionItemLot> InspectionItemLots{ get; set; }
        public virtual DbSet<InspectionQuestion> InspectionQuestions{ get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Lot> Lots { get; set; }
        public virtual DbSet<MaterialCategory> MaterialCategories { get; set; }
        public virtual DbSet<Operator> Operators { get; set; }
        public virtual DbSet<ProcessedLot> ProcessedLots { get; set; }
        public virtual DbSet<Vendor> Vendors { get; set; }
        public virtual DbSet<VendorItem> VendorItems { get; set; }

        public MTSDbContext(DbContextOptions<MTSDbContext> options)
          : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 

            modelBuilder.Entity<Inspection>(entity =>
            { 
                entity.ToTable("Inspection");

                entity.HasKey(x => x.Id);

                entity.HasOne(x => x.Inspector)
                   .WithMany(x => x.Inspections)
                   .HasForeignKey(x => x.InspectedById);

                entity.HasOne(x => x.Supplier)
                   .WithMany(x => x.Inspections)
                   .HasForeignKey(x => x.SupplierId);
            });

            modelBuilder.Entity<InspectionItem>(entity =>
            {
                entity.ToTable("InspectionItem");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(x => x.Inspection)
                   .WithMany(x => x.InspectionItems)
                   .HasForeignKey(x => x.InspectionId);

                entity.HasOne(x => x.Item)
                   .WithMany(x => x.InspectionItems)
                   .HasForeignKey(x => x.ItemId);
            });

            modelBuilder.Entity<InspectionItemLot>(entity =>
            {
                entity.ToTable("InspectionItemLot");

                entity.HasKey(x => x.Id);

                entity.HasOne(x => x.InspectionItem)
                   .WithMany(x => x.InspectionItemLots)
                   .HasForeignKey(x => x.InspectionItemId);

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<InspectionQuestion>(entity =>
            {
                entity.ToTable("InspectionQuestion");

                entity.HasKey(x => x.Id);

                entity.HasOne(x => x.Inspection)
                  .WithOne(x => x.InspectionQuestion)
                  .HasForeignKey<InspectionQuestion>(x => x.InspectionId);

            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("Item");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.MaterialCategoryId)
                      .IsRequired()
                      .HasColumnType("int");

                entity.Property(e => e.VendorItemId)
                      .IsRequired()
                      .HasColumnType("varchar")
                      .HasMaxLength(50);

                entity.Property(e => e.Description)
                       .IsRequired()
                       .HasColumnType("varchar")
                       .HasMaxLength(1000);

                entity.Property(e => e.StatusId)
                    .IsRequired()
                    .HasColumnType("int");
            });

            modelBuilder.Entity<Lot>(entity =>
            {
                entity.ToTable("Lot");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(x => x.Item)
                    .WithMany(x => x.Lots)
                    .HasForeignKey(x => x.ItemId);

                entity.HasOne(x => x.Vendor)
                   .WithMany(x => x.Lots)
                   .HasForeignKey(x => x.VendorId);

                entity.HasOne(x => x.Operator)
                   .WithMany(x => x.Lots)
                   .HasForeignKey(x => x.CreatedByUserId);
            });

            modelBuilder.Entity<MaterialCategory>(entity =>
            {
                entity.ToTable("l_MaterialCategory");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.Name)
                       .IsRequired()
                       .HasColumnType("varchar")
                       .HasMaxLength(255);

                entity.Property(e => e.StatusId)
                    .IsRequired()
                    .HasColumnType("int");

                entity.HasMany(x => x.Items)
                .WithOne(x => x.MaterialCategory)
                .HasForeignKey(x => x.MaterialCategoryId);

            });

            modelBuilder.Entity<Operator>(entity =>
            {
                entity.ToTable("Operator");

                entity.HasKey(x => x.Id);

            });

            modelBuilder.Entity<ProcessedLot>(entity =>
            {
                entity.ToTable("ProcessedLot");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.DateProcessed)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive)
                   .HasColumnType("bit")
                   .HasDefaultValueSql("(1)");

                entity.HasOne(x => x.Operator)
                   .WithMany(x => x.ProcessedLots)
                   .HasForeignKey(x => x.ProcessedByUserId);
            });

            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.ToTable("Vendor");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.Name)
                       .IsRequired()
                       .HasColumnType("varchar")
                       .HasMaxLength(255);

                entity.Property(e => e.StatusId)
                    .IsRequired()
                    .HasColumnType("int");

            });

            modelBuilder.Entity<VendorItem>(entity =>
            {
                entity.ToTable("VendorItem");

                entity.HasKey(x => x.Id);

                entity.Property(e => e.VendorId)
                   .IsRequired()
                   .HasColumnType("int");

                entity.Property(e => e.ItemId)
                   .IsRequired()
                   .HasColumnType("int");

                entity.Property(e => e.StatusId)
                        .IsRequired()
                        .HasColumnType("int");

                entity.HasOne(x => x.Vendor)
                    .WithMany(x => x.VendorItems)
                    .HasForeignKey(x => x.VendorId);

                entity.HasOne(x => x.Item)
                    .WithMany(x => x.VendorItems)
                    .HasForeignKey(x => x.ItemId);


            });
        }
    }
}
