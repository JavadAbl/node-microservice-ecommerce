import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { vehicleService } from "../services/vehicle-service.js";
import { CreateVehicleRequestRouteType } from "../schemas/vehicle/create-vehicle-schema.js";
import { GetVehiclesRequestRouteType } from "../schemas/vehicle/get-vehicle-schema.js";

function getVehicles(req: FastifyRequest<GetVehiclesRequestRouteType>, reply) {
  return vehicleService.getMany(req.query);
}

function createVehicle(req: FastifyRequest<CreateVehicleRequestRouteType>, rep: FastifyReply) {
  rep.statusCode = StatusCodes.CREATED;
  return vehicleService.create(req.body);
}

export const vehicleController = { getVehicles, createVehicle };
