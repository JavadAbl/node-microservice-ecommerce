using Domain.Enums;

namespace Application.Contracts.Dto;

public class VehicleDto
{
    public Guid Id { get; set; }
    public string? VIN { get; set; }
    public string? Make { get; set; }
    public string? Model { get; set; }
    public int Year { get; set; }
    public string? Trim { get; set; }
    public FuelType? FuelType { get; set; }
    public TransmissionType? Transmission { get; set; }
    public string? Engine { get; set; }
    public string? Color { get; set; }
    public int? Mileage { get; set; }
    public string? LicensePlate { get; set; }
    public string? State { get; set; }
    public string? OwnerId { get; set; }
    public VehicleStatus? Status { get; set; } = VehicleStatus.Active;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsDeleted { get; set; } = false;
    public string? FuelTypeTitle => this.FuelType?.GetDisplayName();
    public string? TransmissionTypeTitle => this.Transmission?.GetDisplayName();
    public string? VehicleStatusTitle => this.Status?.GetDisplayName();

}