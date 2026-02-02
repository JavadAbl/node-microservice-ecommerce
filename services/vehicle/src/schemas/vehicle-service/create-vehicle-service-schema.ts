import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleServiceDto, VehicleServiceDtoSchema } from "./vehicle-service-schema.js";

const CreateVehicleServiceBodySchema = Type.Object({
  serviceDate: Type.String({ format: "date-time", description: "Date when the service was performed" }),
  mileageAtService: Type.Integer({ description: "Mileage of the vehicle at the time of service" }),
  technicianName: Type.String({ description: "Name of the technician who performed the service" }),
  description: Type.Optional(Type.String({ description: "Description of the service performed" })),
  vehicleId: Type.Integer({ description: "ID of the vehicle that received the service" }),
  serviceId: Type.Integer({ description: "ID of the service reference" }),
});

export const CreateVehicleServiceSchema = {
  body: CreateVehicleServiceBodySchema,
  response: { 201: VehicleServiceDtoSchema },
};

export type CreateVehicleService = Static<typeof CreateVehicleServiceBodySchema>;

export interface CreateVehicleServiceRouteType extends RouteGenericInterface {
  Body: CreateVehicleService;
  Reply: VehicleServiceDto;
}
