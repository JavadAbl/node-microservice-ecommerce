"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateVehicleDto,
  createVehicleSchema,
} from "../schema/create-vehicle-schema";
import { FormState } from "@/lib/shared/types/form-state";

export async function createVehicleAction(
  payload: CreateVehicleDto,
): Promise<FormState> {
  try {
    const validatedFields = createVehicleSchema.safeParse(payload);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }
    //db mock
    console.log("created:", payload);
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    return {
      success: false,
      error: "Failed to create vehicle. Please try again.",
      fieldErrors: undefined,
    };
  }

  revalidatePath("/");
  redirect("/");
}
