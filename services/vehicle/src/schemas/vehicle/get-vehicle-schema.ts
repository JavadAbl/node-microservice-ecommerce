import { Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleDto, VehicleDtoSchema } from "./vehicle-schema.js";
import { GetManyRequestQuery, GetManyRequestQuerySchema } from "../common/get-many-request.schema.js";

export const GetVehiclesRequestSchema = {
  Querystring: GetManyRequestQuerySchema,
  description: "Get multiple vehicles with pagination, sorting, and searching",
  tags: ["Vehicles"],
  response: { 200: Type.Array(VehicleDtoSchema) },
};

export interface GetVehiclesRequestRouteType extends RouteGenericInterface {
  Querystring: GetManyRequestQuery<"Vehicle">;
  Reply: VehicleDto[];
}
