using Domain.Enums;
using Domain.Models;

namespace Application.Contracts.Repositories;

public interface IVehicleRepository
{
    Task<IEnumerable<Vehicle>> GetAllAsync();

    Task<Vehicle?> GetByIdAsync(int id);

    Task AddAsync(Vehicle vehicle);

    Task UpdateAsync(Vehicle vehicle);

    Task DeleteAsync(int id);

    Task<IEnumerable<Vehicle>> GetByMakeAsync(string make);

    Task<IEnumerable<Vehicle>> GetByModelAsync(string model);

    Task<IEnumerable<Vehicle>> GetByFuelTypeAsync(FuelType fuelType);

    Task<IEnumerable<Vehicle>> GetByTransmissionTypeAsync(TransmissionType transmissionType);

    Task<IEnumerable<Vehicle>> GetByStatusAsync(VehicleStatus status);

    Task<IEnumerable<Vehicle>> GetByYearRangeAsync(int startYear, int endYear);

    Task<IEnumerable<Vehicle>> GetByMileageRangeAsync(int minMileage, int maxMileage);

    Task<bool> ExistsAsync(int id);

    Task<IQueryable<Vehicle>> GetAllQueryableAsync();
}