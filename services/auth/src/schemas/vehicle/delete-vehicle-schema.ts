import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleDto, VehicleDtoSchema } from "./vehicle-schema.js";

const DeleteVehicleParamSchema = Type.Object({
  id: Type.Integer({ description: "Id of the vehicle", minimum: 1 }),
});

export const DeleteVehicleSchema = {
  params: DeleteVehicleParamSchema,
  description: "Delete a vehicle by ID",
  tags: ["Vehicles"],
  response: { 201: Type.Unknown() },
};

export type DeleteVehicleParams = Static<typeof DeleteVehicleParamSchema>;

export interface DeleteVehicleRouteType extends RouteGenericInterface {
  Params: DeleteVehicleParams;
}
