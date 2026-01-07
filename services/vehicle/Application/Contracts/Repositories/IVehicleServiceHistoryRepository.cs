
using Domain.Models;

namespace Application.Contracts.Repositories;

public interface IVehicleServiceHistoryRepository
{
    Task<IEnumerable<VehicleServiceHistory>> GetAllAsync();

    Task<VehicleServiceHistory?> GetByIdAsync(int id);

    Task<IEnumerable<VehicleServiceHistory>> GetByVehicleIdAsync(int vehicleId);

    Task AddAsync(VehicleServiceHistory vehicle);

    Task UpdateAsync(VehicleServiceHistory vehicle);

    Task DeleteAsync(int id);

    Task<bool> ExistsAsync(int id);

    Task<IQueryable<VehicleServiceHistory>> GetAllQueryableAsync();
}
