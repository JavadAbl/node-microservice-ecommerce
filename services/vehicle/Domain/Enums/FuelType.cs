namespace Domain.Enums;

public enum FuelType
{
    Gasoline,
    Diesel,
    Electric,
    Hybrid,
    PlugInHybrid,
    Hydrogen,
    Other
}


public static class FuelTypeExtensions
{
    public static string GetDisplayName(this FuelType fuelType)
    {
        return fuelType switch
        {
            FuelType.Gasoline => "Gasoline",
            FuelType.Diesel => "Diesel",
            FuelType.Electric => "Electric",
            FuelType.Hybrid => "Hybrid",
            FuelType.PlugInHybrid => "Plug-in Hybrid",
            FuelType.Hydrogen => "Hydrogen",
            FuelType.Other => "Other",
            _ => fuelType.ToString()
        };
    }
}