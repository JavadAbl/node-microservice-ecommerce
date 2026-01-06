namespace Domain.Enums;

public enum TransmissionType
{
    Automatic,
    Manual,
    CVT, // Continuously Variable Transmission
    DualClutch,
    Robotic,
    Other
}

public static class TransmissionTypeExtensions
{
    public static string GetDisplayName(this TransmissionType transmission)
    {
        return transmission switch
        {
            TransmissionType.Automatic => "Automatic",
            TransmissionType.Manual => "Manual",
            TransmissionType.CVT => "Continuously Variable Transmission",
            TransmissionType.DualClutch => "Dual‑Clutch",
            TransmissionType.Robotic => "Robotic",
            TransmissionType.Other => "Other",
            _ => transmission.ToString()
        };
    }
}