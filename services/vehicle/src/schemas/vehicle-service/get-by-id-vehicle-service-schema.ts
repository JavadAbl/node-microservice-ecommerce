import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleServiceDto, VehicleServiceDtoSchema } from "./vehicle-service-schema.js";

const GetVehicleServiceByIdParamSchema = Type.Object({
  id: Type.Integer({ description: "Vehicle service history record ID" }),
});

export const GetVehicleServiceByIdSchema = {
  params: GetVehicleServiceByIdParamSchema,
  response: { 200: VehicleServiceDtoSchema },
};

export type GetVehicleServiceByIdParams = Static<typeof GetVehicleServiceByIdParamSchema>;

export interface GetVehicleServiceByIdRouteType extends RouteGenericInterface {
  Params: GetVehicleServiceByIdParams;
  Reply: VehicleServiceDto;
}
