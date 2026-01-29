import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleDto, VehicleDtoSchema } from "./vehicle-schema.js";

const GetVehicleByIdParamSchema = Type.Object({
  id: Type.Integer({ description: "Id of the vehicle", minimum: 1 }),
});

export const GetVehicleByIdRequestSchema = {
  params: GetVehicleByIdParamSchema,
  description: "Get a vehicle by ID",
  tags: ["Vehicles"],
  response: { 200: VehicleDtoSchema },
};

export type GetVehicleByIdParams = Static<typeof GetVehicleByIdParamSchema>;

export interface GetVehicleByIdRequestRouteType extends RouteGenericInterface {
  Params: GetVehicleByIdParams;
  Reply: VehicleDto;
}
