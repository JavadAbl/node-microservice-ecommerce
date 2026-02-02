import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleServiceDto, VehicleServiceDtoSchema } from "./vehicle-service-schema.js";

const UpdateVehicleServiceBodySchema = Type.Partial(
  Type.Object({
    serviceDate: Type.String({ format: "date-time", description: "Date when the service was performed" }),
    mileageAtService: Type.Integer({ description: "Mileage of the vehicle at the time of service" }),
    technicianName: Type.String({ description: "Name of the technician who performed the service" }),
    description: Type.Optional(Type.String({ description: "Description of the service performed" })),
    vehicleId: Type.Integer({ description: "ID of the vehicle that received the service" }),
    serviceId: Type.Integer({ description: "ID of the service reference" }),
  }),
);

const UpdateVehicleServiceParamSchema = Type.Object({
  id: Type.Integer({ description: "Vehicle service history record ID" }),
});

export const UpdateVehicleServiceSchema = {
  body: UpdateVehicleServiceBodySchema,
  params: UpdateVehicleServiceParamSchema,
  response: { 200: VehicleServiceDtoSchema },
};

export type UpdateVehicleService = Static<typeof UpdateVehicleServiceBodySchema>;
export type UpdateVehicleServiceParams = Static<typeof UpdateVehicleServiceParamSchema>;

export interface UpdateVehicleServiceRouteType extends RouteGenericInterface {
  Params: UpdateVehicleServiceParams;
  Body: UpdateVehicleService;
  Reply: VehicleServiceDto;
}
