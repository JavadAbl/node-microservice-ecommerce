"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createVehicleSchema } from "../schema/create-vehicle-schema";
import { FormState } from "@/lib/shared/types/form-state";

export async function createVehicleAction(
  formData: FormData,
): Promise<FormState> {
  try {
    const validatedFields = createVehicleSchema.safeParse({
      vin: formData.get("vin"),
      make: formData.get("make"),
      model: formData.get("model"),
      year: formData.get("year"),
      trim: formData.get("trim"),
      fuelType: formData.get("fuelType"),
      transmission: formData.get("transmission"),
      engine: formData.get("engine"),
      color: formData.get("color"),
      mileage: formData.get("mileage"),
      licensePlate: formData.get("licensePlate"),
      state: formData.get("state"),
      status: formData.get("status"),
      description: formData.get("description"),
      customerId: formData.get("customerId"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }
    //db mock
    console.log("created");
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
