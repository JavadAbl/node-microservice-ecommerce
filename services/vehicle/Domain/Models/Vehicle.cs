using Domain.Entity;
using Domain.Enums;

namespace Domain.Models;

public class Vehicle : BaseEntity
{
    public int Id { get; set; }
    public required string VIN { get; set; }
    public required string Make { get; set; }
    public required string Model { get; set; }
    public required int Year { get; set; }
    public string? Trim { get; set; }
    public FuelType? FuelType { get; set; }
    public TransmissionType? Transmission { get; set; }
    public string? Engine { get; set; }
    public string? Color { get; set; }
    public int? Mileage { get; set; }
    public string? LicensePlate { get; set; }
    public string? State { get; set; }
    public string? OwnerId { get; set; }
    public VehicleStatus Status { get; set; } = VehicleStatus.Active;
    public bool IsDeleted { get; set; } = false;

}