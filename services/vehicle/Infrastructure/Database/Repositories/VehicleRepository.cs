
using Application.Contracts.Repositories;
using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories;

class VehicleRepository(AppDbContext _context) : IVehicleRepository
{

    public async Task<IEnumerable<Vehicle>> GetAllAsync()
    {
        return await _context.Vehicles
            .Where(v => !v.IsDeleted) // assuming soft delete
            .ToListAsync();
    }

    public async Task<Vehicle?> GetByIdAsync(int id)
    {
        return await _context.Vehicles
            .Where(v => v.Id == id && !v.IsDeleted)
            .FirstOrDefaultAsync();
    }

    public async Task AddAsync(Vehicle vehicle)
    {
        if (vehicle == null)
            throw new ArgumentNullException(nameof(vehicle));


        await _context.Vehicles.AddAsync(vehicle);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Vehicle vehicle)
    {
        if (vehicle == null)
            throw new ArgumentNullException(nameof(vehicle));


        _context.Vehicles.Update(vehicle);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var vehicle = await GetByIdAsync(id);
        if (vehicle == null)
            throw new InvalidOperationException($"Vehicle with ID {id} not found.");

        // Soft delete — set IsDeleted = true
        vehicle.IsDeleted = true;
        _context.Vehicles.Update(vehicle);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByMakeAsync(string make)
    {
        if (string.IsNullOrWhiteSpace(make))
            return Enumerable.Empty<Vehicle>();

        return await _context.Vehicles
            .Where(v => v.Make.Equals(make, StringComparison.OrdinalIgnoreCase) && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByModelAsync(string model)
    {
        if (string.IsNullOrWhiteSpace(model))
            return Enumerable.Empty<Vehicle>();

        return await _context.Vehicles
            .Where(v => v.Model.Equals(model, StringComparison.OrdinalIgnoreCase) && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByFuelTypeAsync(FuelType fuelType)
    {
        return await _context.Vehicles
            .Where(v => v.FuelType == fuelType && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByTransmissionTypeAsync(TransmissionType transmissionType)
    {
        return await _context.Vehicles
            .Where(v => v.Transmission == transmissionType && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByStatusAsync(VehicleStatus status)
    {
        return await _context.Vehicles
            .Where(v => v.Status == status && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByYearRangeAsync(int startYear, int endYear)
    {
        if (startYear > endYear)
            throw new ArgumentException("Start year cannot be greater than end year.");

        return await _context.Vehicles
            .Where(v => v.Year >= startYear && v.Year <= endYear && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Vehicle>> GetByMileageRangeAsync(int minMileage, int maxMileage)
    {
        if (minMileage > maxMileage)
            throw new ArgumentException("Minimum mileage cannot be greater than maximum mileage.");

        return await _context.Vehicles
            .Where(v => v.Mileage.HasValue && v.Mileage >= minMileage && v.Mileage <= maxMileage && !v.IsDeleted)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Vehicles
            .AnyAsync(v => v.Id == id && !v.IsDeleted);
    }

    public async Task<IQueryable<Vehicle>> GetAllQueryableAsync()
    {
        return _context.Vehicles
            .Where(v => !v.IsDeleted)
            .AsQueryable();
    }
}