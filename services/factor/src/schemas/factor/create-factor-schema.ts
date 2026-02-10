import { z } from "zod";
import { FactorStatus } from "../../infrastructure/database/generated/prisma/enums.js";
import { CreateFactorItemSchema } from "../factor-item/create-factor-item-schema.js";

export const CreateFactorSchema = z.object({
  description: z.string().nullable(),
  customerId: z.number(),

  items: z.array(CreateFactorItemSchema),
});

export type CreateFactor = z.infer<typeof CreateFactorSchema>;
