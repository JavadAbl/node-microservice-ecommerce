import { z } from "zod";
import { UpdateFactorItemSchema } from "../factor-item/update-factor-item-schema.js";

export const UpdateFactorSchema = z.object({
  description: z.string().optional(),
  customerId: z.number().optional(),

  items: z.array(UpdateFactorItemSchema),
});

export type UpdateFactor = z.infer<typeof UpdateFactorSchema>;
