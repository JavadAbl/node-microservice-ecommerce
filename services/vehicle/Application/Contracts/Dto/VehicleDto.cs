

namespace Application.Contracts.Dto;

public class VehicleDto
{
    public string FuelTypeDisplayName => vehicle.FuelType?.GetDisplayName();
}