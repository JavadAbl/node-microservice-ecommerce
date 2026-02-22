"use server";

import { FormState } from "@/lib/shared/types/form-state";
import { registerSchema } from "../schema/register-schema";

export async function registerAction(formData: FormData): Promise<FormState> {
  try {
    const rawInput = Object.fromEntries(formData);

    const validatedFields = registerSchema.safeParse(rawInput);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, mobile, password } = validatedFields.data;

    // Call your Auth Microservice here
    // await authService.register({ email, mobile, password });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Failed to register user. Please try again.",
    };
  }
}
