

using Domain.Entity;
using Domain.Enums;

namespace Domain.Models;

public class VehicleServiceHistory : BaseEntity
{
    public int Id { get; set; }
    public required VehicleServiceType ServiceType { get; set; }
    public DateTime ServiceDate { get; set; }
    public int MileageAtService { get; set; }
    public required string TechnicianName { get; set; }
    public string? Notes { get; set; }

    public required Vehicle vehicle { get; set; }
    public int VehicleId { get; set; }
}