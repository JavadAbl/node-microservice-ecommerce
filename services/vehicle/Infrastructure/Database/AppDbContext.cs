
using Domain.Models;
using Infrastructure.Database.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

internal class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    internal DbSet<Vehicle> Vehicles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new VehicleConfiguration());
    }
}