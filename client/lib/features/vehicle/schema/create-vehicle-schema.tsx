import { z } from "zod";

const emptyToNull = (val: unknown) =>
  val === "" || val === undefined ? null : val;

export const createVehicleSchema = z.object({
  vin: z.string().min(1, "VIN is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),

  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),

  trim: z.preprocess(emptyToNull, z.string().nullable()),

  fuelType: z.preprocess(
    emptyToNull,
    z
      .enum([
        "Gasoline",
        "Diesel",
        "Electric",
        "Hybrid",
        "PlugInHybrid",
        "Hydrogen",
        "Other",
      ])
      .nullable(),
  ),

  transmission: z.preprocess(
    emptyToNull,
    z
      .enum(["Automatic", "Manual", "CVT", "DualClutch", "Robotic", "Other"])
      .nullable(),
  ),

  engine: z.preprocess(emptyToNull, z.string().nullable()),

  color: z.preprocess(emptyToNull, z.string().nullable()),

  mileage: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce.number().nonnegative().nullable(),
  ),

  licensePlate: z.preprocess(emptyToNull, z.string().nullable()),

  state: z.preprocess(emptyToNull, z.string().nullable()),

  status: z.enum([
    "Active",
    "InRepair",
    "ReadyForPickup",
    "Archived",
    "UnderWarranty",
    "InService",
    "OnLoan",
    "NotOperational",
  ]),

  description: z.preprocess(emptyToNull, z.string().nullable()),

  customerId: z.coerce.number().min(1, "Customer is required"),
});

export type CreateVehicle = z.infer<typeof createVehicleSchema>;
