"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateVehicleServiceDto,
  createVehicleServiceSchema,
} from "../schema/create-vehicle-service-schema";
import { FormState } from "@/lib/shared/types/form-state";

interface CreateVehicleServiceActionProps {
  vehicleId: number;
}

export async function createVehicleServiceAction(
  payload: CreateVehicleServiceDto,
  props: CreateVehicleServiceActionProps,
): Promise<FormState> {
  try {
    const validatedFields = createVehicleServiceSchema.safeParse(payload);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const {
      serviceDate,
      mileageAtService,
      technicianName,
      description,
      serviceId,
    } = validatedFields.data;

    // 🔹 DB mock - replace with your Prisma call
    console.log("Creating VehicleService:", {
      vehicleId: props.vehicleId,
      serviceId,
      serviceDate: new Date(serviceDate),
      mileageAtService,
      technicianName,
      description,
    });

    // await db.vehicleService.create({
    //   data: {
    //     vehicleId: props.vehicleId,
    //     serviceId,
    //     serviceDate: new Date(serviceDate),
    //     mileageAtService,
    //     technicianName,
    //     description,
    //   },
    // });
  } catch (error) {
    console.error("Failed to create vehicle service:", error);
    return {
      success: false,
      error: "Failed to create service record. Please try again.",
      fieldErrors: undefined,
    };
  }

  revalidatePath(`/vehicles/${props.vehicleId}`);
  redirect(`/vehicles/${props.vehicleId}`);
}
