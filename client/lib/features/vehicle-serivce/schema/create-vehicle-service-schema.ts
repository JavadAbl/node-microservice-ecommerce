import z from "zod";

export const createVehicleServiceSchema = z.object({
  serviceDate: z
    .string({ error: "Service date is required" })
    .min(1, "Service date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  mileageAtService: z
    .number({ error: "Mileage at service is required" })
    .min(0, "Mileage cannot be negative")
    .int("Mileage must be a whole number"),

  technicianName: z
    .string({ error: "Technician name is required" })
    .min(1, "Technician name is required")
    .max(100, "Technician name is too long"),

  description: z.string().max(1000, "Description is too long").nullable(),

  serviceId: z
    .number({ error: "Service type is required" })
    .min(1, "Please select a valid service"),
});

export type CreateVehicleServiceDto = z.infer<
  typeof createVehicleServiceSchema
>;
