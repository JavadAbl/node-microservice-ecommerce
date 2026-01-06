
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

internal class AppDbContext : DbContext
{
    internal AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    internal DbSet<Vehicle> Products;
}