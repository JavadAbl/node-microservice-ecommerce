namespace Domain.Enums;

public enum VehicleStatus
{
    Active,           // Vehicle is in normal use
    InRepair,         // Currently being repaired
    ReadyForPickup,   // Repair completed, awaiting customer
    Archived,         // No longer active (sold, scrapped, etc.)
    UnderWarranty,    // In warranty period
    InService,        // In service (e.g., fleet vehicle)
    OnLoan,           // Loaner vehicle
    NotOperational    // Broken down, not in service
}

public static class VehicleStatusExtensions
{
    public static string GetDisplayName(this VehicleStatus status)
    {
        return status switch
        {
            VehicleStatus.Active => "Active",
            VehicleStatus.InRepair => "In Repair",
            VehicleStatus.ReadyForPickup => "Ready for Pickup",
            VehicleStatus.Archived => "Archived",
            VehicleStatus.UnderWarranty => "Under Warranty",
            VehicleStatus.InService => "In Service",
            VehicleStatus.OnLoan => "On Loan",
            VehicleStatus.NotOperational => "Not Operational",
            _ => status.ToString()
        };
    }
}
