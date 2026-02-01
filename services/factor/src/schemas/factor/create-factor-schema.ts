import { z } from "zod";

// Define the Schema for the Request Body
// We use z.coerce to automatically transform strings to numbers (e.g. form data)
export const createFactorSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(20).trim(), // .trim() is a transformation
    email: z.string().email(),
    age: z.coerce.number().int().positive(), // Transform string "25" to number 25
    password: z.string().min(8),
    isActive: z.boolean().optional(),
  }),
});

// Infer the TypeScript Type from the Zod Schema
// This type represents the final, clean data after validation
export type CreateFactorInput = z.infer<typeof createFactorSchema>["body"];
