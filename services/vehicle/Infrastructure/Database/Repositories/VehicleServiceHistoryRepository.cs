using Application.Contracts.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories;



class VehicleServiceHistoryRepository(AppDbContext _context) : IVehicleServiceHistoryRepository
{

    public async Task<IEnumerable<VehicleServiceHistory>> GetAllAsync()
    {
        return await _context.VehicleServiceHistories
            .ToListAsync(); // No soft delete unless you add IsDeleted flag
    }

    public async Task<VehicleServiceHistory?> GetByIdAsync(int id)
    {
        return await _context.VehicleServiceHistories
            .FirstOrDefaultAsync(v => v.Id == id);
    }

    public async Task<IEnumerable<VehicleServiceHistory>> GetByVehicleIdAsync(int vehicleId)
    {
        return await _context.VehicleServiceHistories
            .Where(v => v.VehicleId == vehicleId)
            .ToListAsync();
    }

    public async Task AddAsync(VehicleServiceHistory history)
    {
        if (history == null)
            throw new ArgumentNullException(nameof(history));

        // Optional: Set timestamps if needed
        history.ServiceDate = DateTime.UtcNow;

        await _context.VehicleServiceHistories.AddAsync(history);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(VehicleServiceHistory history)
    {
        if (history == null)
            throw new ArgumentNullException(nameof(history));

        history.ServiceDate = DateTime.UtcNow; // Optional: update timestamp

        _context.VehicleServiceHistories.Update(history);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var history = await GetByIdAsync(id);
        if (history == null)
            throw new InvalidOperationException($"Service history with ID {id} not found.");

        // Soft delete? Optional — uncomment if you want it
        // history.IsDeleted = true;
        // history.UpdatedAt = DateTime.UtcNow;

        _context.VehicleServiceHistories.Remove(history);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.VehicleServiceHistories
            .AnyAsync(v => v.Id == id);
    }

    public async Task<IQueryable<VehicleServiceHistory>> GetAllQueryableAsync()
    {
        return _context.VehicleServiceHistories.AsQueryable();
    }
}