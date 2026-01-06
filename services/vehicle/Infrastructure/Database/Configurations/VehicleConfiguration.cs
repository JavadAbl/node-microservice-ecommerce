using Domain.Models;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Database.Configurations;

public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.ToTable("Vehicles");

        builder.HasKey(v => v.Id);

        // VIN — required, 17 chars, unique
        builder.Property(v => v.VIN)
               .IsRequired()
               .HasMaxLength(17)
               .IsFixedLength(); // if you want to enforce 17 chars

        // Make — required, max 100
        builder.Property(v => v.Make)
               .IsRequired()
               .HasMaxLength(100);

        // Model — required, max 100
        builder.Property(v => v.Model)
               .IsRequired()
               .HasMaxLength(100);

        // Year — required, range 1900–2100
        builder.Property(v => v.Year)
               .IsRequired();

        // FuelType — nullable
        builder.Property(v => v.FuelType)
               .IsRequired(false);

        // Transmission — nullable
        builder.Property(v => v.Transmission)
               .IsRequired(false);

        // Status — default = Active
        builder.Property(v => v.Status)
               .HasDefaultValue(VehicleStatus.Active);

        // Timestamps
        builder.Property(v => v.CreatedAt)
               .IsRequired()
               .HasDefaultValueSql("GETUTCDATE()");

        builder.Property(v => v.UpdatedAt)
               .IsRequired()
               .HasDefaultValueSql("GETUTCDATE()");

        // Soft delete
        builder.Property(v => v.IsDeleted)
               .IsRequired()
               .HasDefaultValue(false);

        // Index for VIN for fast lookup
        builder.HasIndex(v => v.VIN).IsUnique(true);

        // Index for Status for filtering
        builder.HasIndex(v => v.Status);
    }
}
