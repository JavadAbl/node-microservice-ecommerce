

using Application.Contracts.Repositories;
using Infrastructure.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Database.Extensions;

public static class DbContextExtensions
{
    public static IServiceCollection AddApplicationDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<AppDbContext>(async options =>
     options.UseMySql(
         connectionString,
         await ServerVersion.AutoDetectAsync(connectionString),
         mySqlOptions =>
         {
             mySqlOptions.EnableRetryOnFailure(
                 maxRetryCount: 5,
                 maxRetryDelay: TimeSpan.FromSeconds(30),
                 errorNumbersToAdd: null);
         }));

        services.AddScoped<IVehicleRepository, VehicleRepository>();
        services.AddScoped<IVehicleServiceHistoryRepository, VehicleServiceHistoryRepository>();

        return services;
    }
}