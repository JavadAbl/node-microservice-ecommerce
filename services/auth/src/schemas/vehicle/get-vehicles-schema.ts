import { Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleDto, VehicleDtoSchema } from "./vehicle-schema.js";
import { GetManyQuery, GetManyQuerySchema } from "../common/get-many-request.schema.js";

export const GetVehiclesSchema = {
  Querystring: GetManyQuerySchema,
  description: "Get multiple vehicles with pagination, sorting, and searching",
  tags: ["Vehicles"],
  response: { 200: Type.Array(VehicleDtoSchema) },
};

export interface GetVehiclesRouteType extends RouteGenericInterface {
  Querystring: GetManyQuery<"Vehicle">;
  Reply: VehicleDto[];
}
