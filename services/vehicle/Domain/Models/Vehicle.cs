using Domain.Enums;

namespace Domain.Models;

public record Vehicle(
    Guid Id,
    string VIN,
    string Make,
    string Model,
    int Year,
    string? Trim,
    FuelType? FuelType,
    TransmissionType? Transmission,
    string? Engine,
    string? Color,
    int? Mileage,
    string? LicensePlate,
    string? State,
    string? OwnerId,
    VehicleStatus Status = VehicleStatus.Active,
    DateTime CreatedAt = default,
    DateTime UpdatedAt = default,
    bool IsDeleted = false
);