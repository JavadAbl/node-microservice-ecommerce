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