import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleServiceDto, VehicleServiceDtoSchema } from "./vehicle-service-schema.js";

const DeleteVehicleServiceParamSchema = Type.Object({
  id: Type.Integer({ description: "Vehicle service history record ID" }),
});

export const DeleteVehicleServiceSchema = {
  params: DeleteVehicleServiceParamSchema,
  tags: ["VehicleService"],
  response: { 200: VehicleServiceDtoSchema },
};

export type DeleteVehicleServiceParams = Static<typeof DeleteVehicleServiceParamSchema>;

export interface DeleteVehicleServiceRouteType extends RouteGenericInterface {
  Params: DeleteVehicleServiceParams;
  Reply: VehicleServiceDto;
}
