import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleServiceDto, VehicleServiceDtoSchema } from "./vehicle-service-schema.js";

const GetVehicleServiceHistoriesQuerystring = Type.Object({
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
  offset: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
  vehicleId: Type.Optional(Type.Integer({ description: "Filter by vehicle ID" })),
});

export const GetVehicleServiceHistoriesSchema = {
  querystring: GetVehicleServiceHistoriesQuerystring,
  response: { 200: Type.Array(VehicleServiceDtoSchema) },
};

export type GetVehicleServiceHistoriesQuery = Static<typeof GetVehicleServiceHistoriesQuerystring>;

export interface GetVehicleServiceHistoriesRouteType extends RouteGenericInterface {
  Querystring: GetVehicleServiceHistoriesQuery;
  Reply: VehicleServiceDto[];
}
