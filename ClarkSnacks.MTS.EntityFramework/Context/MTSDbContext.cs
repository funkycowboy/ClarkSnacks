using System;
using ClarkSnacks.MTS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClarkSnacks.MTS.EntityFramework.Context
{
    public class MTSDbContext : DbContext
    {
        public virtual DbSet<Vendor> Vendors { get; set; }

        public MTSDbContext(DbContextOptions<MTSDbContext> options)
          : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configure one-to-one relationship
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
        }
    }
}
