// src/app/actions/vehicle-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createVehicleSchema } from "./vehicle-schemas";
import { FormState } from "@/lib/shared/types";

export async function createVehicleAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const validatedFields = createVehicleSchema.safeParse({
      vin: formData.get("vin"),
      make: formData.get("make"),
      model: formData.get("model"),
      year: formData.get("year"),
      trim: formData.get("trim"),
      fuelType: formData.get("fuelType") || undefined,
      transmission: formData.get("transmission") || undefined,
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
        formData: Object.fromEntries(formData.entries()) as Record<
          string,
          string
        >,
      };
    }

    await prisma.vehicle.create({
      data: {
        vin: validatedFields.data.vin,
        make: validatedFields.data.make,
        model: validatedFields.data.model,
        year: validatedFields.data.year,
        trim: validatedFields.data.trim,
        fuelType: validatedFields.data.fuelType,
        transmission: validatedFields.data.transmission,
        engine: validatedFields.data.engine,
        color: validatedFields.data.color,
        mileage: validatedFields.data.mileage,
        licensePlate: validatedFields.data.licensePlate,
        state: validatedFields.data.state,
        status: validatedFields.data.status,
        description: validatedFields.data.description,
        customerId: validatedFields.data.customerId,
      },
    });

    revalidatePath("/vehicles");
    redirect("/vehicles");
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    return {
      success: false,
      error: "Failed to create vehicle. Please try again.",
      fieldErrors: undefined,
      formData: Object.fromEntries(formData.entries()) as Record<
        string,
        string
      >,
    };
  }
}

export async function getCustomersAction() {
  try {
    const customers = await prisma.customerReference.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      orderBy: { lastName: "asc" },
    });

    return customers.map((c) => ({
      id: c.id,
      name: `${c.firstName} ${c.lastName}`,
    }));
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
}
