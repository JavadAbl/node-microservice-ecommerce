import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { VehicleDto, VehicleDtoSchema } from "./vehicle-schema.js";
import {
  FuelType,
  TransmissionType,
  VehicleStatus,
} from "../../infrastructure/database/generated/prisma/enums.js";

const UpdateVehicleBodySchema = Type.Object({
  vin: Type.Optional(Type.String({ description: "Vehicle Identification Number" })),
  make: Type.Optional(Type.String({ description: "Vehicle manufacturer" })),
  model: Type.Optional(Type.String({ description: "Vehicle model" })),
  year: Type.Optional(Type.Integer({ description: "Vehicle manufacturing year" })),
  trim: Type.Optional(Type.String({ description: "Vehicle trim level" })),
  fuelType: Type.Optional(Type.Enum(FuelType, { description: "Fuel type" })),
  transmission: Type.Optional(Type.Enum(TransmissionType, { description: "Transmission type" })),
  engine: Type.Optional(Type.String({ description: "Engine specification" })),
  color: Type.Optional(Type.String({ description: "Vehicle color" })),
  mileage: Type.Optional(Type.Integer({ description: "Vehicle mileage" })),
  licensePlate: Type.Optional(Type.String({ description: "License plate number" })),
  state: Type.Optional(Type.String({ description: "Registration state" })),
  customerId: Type.Optional(Type.String({ description: "Owner ID" })),
  status: Type.Optional(Type.Enum(VehicleStatus, { description: "Vehicle status" })),
  isDeleted: Type.Optional(Type.Boolean({ description: "Soft delete flag" })),
});

const UpdateVehicleParamSchema = Type.Object({
  id: Type.Integer({ description: "Id of the vehicle", minimum: 1 }),
});

export const UpdateVehicleSchema = {
  body: UpdateVehicleBodySchema,
  params: UpdateVehicleParamSchema,
  description: "Update a vehicle entity",
  tags: ["Vehicles"],
  response: { 200: Type.Unknown() },
};

export type UpdateVehicle = Static<typeof UpdateVehicleBodySchema>;
export type UpdateVehicleParams = Static<typeof UpdateVehicleParamSchema>;

export interface UpdateVehicleRouteType extends RouteGenericInterface {
  Body: UpdateVehicle;
  Params: UpdateVehicleParams;
}
