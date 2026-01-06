

namespace Domain.Enums;

public enum VehicleServiceType
{
    OilChange,
    TireRotation,
    BrakeService,
    EngineDiagnostic,
    TransmissionFlush,
    BatteryReplacement,
    AirFilterReplacement,
    SuspensionService,
    Alignment,
    RecallService,
    GeneralMaintenance,
    Other
}

public static class VehicleServiceTypeExtensions
{
    public static string GetDisplayName(this VehicleServiceType service)
    {
        return service switch
        {
            VehicleServiceType.OilChange => "Oil Change",
            VehicleServiceType.TireRotation => "Tire Rotation",
            VehicleServiceType.BrakeService => "Brake Service",
            VehicleServiceType.EngineDiagnostic => "Engine Diagnostic",
            VehicleServiceType.TransmissionFlush => "Transmission Flush",
            VehicleServiceType.BatteryReplacement => "Battery Replacement",
            VehicleServiceType.AirFilterReplacement => "Air Filter Replacement",
            VehicleServiceType.SuspensionService => "Suspension Service",
            VehicleServiceType.Alignment => "Alignment",
            VehicleServiceType.RecallService => "Recall Service",
            VehicleServiceType.GeneralMaintenance => "General Maintenance",
            VehicleServiceType.Other => "Other",
            _ => service.ToString()
        };
    }
}
