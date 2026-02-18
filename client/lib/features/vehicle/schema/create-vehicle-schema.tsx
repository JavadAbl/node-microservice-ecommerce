import z from "zod";

export const createVehicleSchema = z.object({
  vin: z.string().min(1, "VIN is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  trim: z.string().optional(),
  fuelType: z
    .enum([
      "Gasoline",
      "Diesel",
      "Electric",
      "Hybrid",
      "PlugInHybrid",
      "Hydrogen",
      "Other",
    ])
    .optional()
    .or(z.literal("")),
  transmission: z
    .enum(["Automatic", "Manual", "CVT", "DualClutch", "Robotic", "Other"])
    .optional()
    .or(z.literal("")),
  engine: z.string().optional(),
  color: z.string().optional(),
  mileage: z.coerce.number().nonnegative().optional().or(z.literal(0)),
  licensePlate: z.string().optional(),
  state: z.string().optional(),
  status: z
    .enum([
      "Active",
      "InRepair",
      "ReadyForPickup",
      "Archived",
      "UnderWarranty",
      "InService",
      "OnLoan",
      "NotOperational",
    ])
    .default("Active"),
  description: z.string().optional(),
  customerId: z.coerce.number().min(1, "Customer is required"),
});
