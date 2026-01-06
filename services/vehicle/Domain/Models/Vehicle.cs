
using Domain.Enums;

namespace Domain.Models;

public class Vehicle
{
    public Guid Id { get; set; }
    public required string VIN { get; set; }
    public required string Make { get; set; }
    public required string Model { get; set; }
    public int Year { get; set; }
    public required string Trim { get; set; }
    public FuelType? FuelType { get; set; }
    public TransmissionType? Transmission { get; set; }
    public required string Engine { get; set; }
    public required string Color { get; set; }
    public required int? Mileage { get; set; }
    public required string LicensePlate { get; set; }
    public required string State { get; set; }
    public required string OwnerId { get; set; }
    public VehicleStatus Status { get; set; } = VehicleStatus.Active;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;
}