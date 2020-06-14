﻿using System;
using ClarkSnacks.MTS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClarkSnacks.MTS.EntityFramework.Context
{
    public class MTSDbContext : DbContext
    {
        public virtual DbSet<MaterialCategory> MaterialCategories { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Lot> Lots { get; set; }
        public virtual DbSet<ProcessedLot> ProcessedLots { get; set; }
        public virtual DbSet<Vendor> Vendors { get; set; }
        public virtual DbSet<VendorItem> VendorItems { get; set; }

        public MTSDbContext(DbContextOptions<MTSDbContext> options)
          : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

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
            });
       
        }
    }
}
