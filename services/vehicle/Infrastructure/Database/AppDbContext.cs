
using Domain.Entity;
using Domain.Models;
using Infrastructure.Database.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

internal class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    internal DbSet<Vehicle> Vehicles { get; set; }
    internal DbSet<VehicleServiceHistory> VehicleServiceHistories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new VehicleConfiguration());
    }


    public override int SaveChanges()
    {
        var entries = ChangeTracker.Entries<BaseEntity>()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            entry.Entity.UpdatedAt = DateTime.UtcNow;

            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
            }
        }

        return base.SaveChanges();
    }
}