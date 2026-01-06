

namespace Domain.Models;

public class VehicleServiceHistory
{
    public Guid Id { get; set; }
    public Guid VehicleId { get; set; }
    public VehicleServiceType ServiceType { get; set; }
    public DateTime ServiceDate { get; set; }
    public int MileageAtService { get; set; }
    public string TechnicianName { get; set; }
    public string Notes { get; set; }
}