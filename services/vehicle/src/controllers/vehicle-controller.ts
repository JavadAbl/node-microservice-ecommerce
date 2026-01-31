import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { vehicleService } from "../services/vehicle-service.js";
import { CreateVehicleRouteType } from "../schemas/vehicle/create-vehicle-schema.js";
import { DeleteVehicleRouteType } from "../schemas/vehicle/delete-vehicle-schema.js";
import { GetVehicleByIdRouteType } from "../schemas/vehicle/get-by-id-vehicle-schema.js";
import { GetVehiclesRouteType } from "../schemas/vehicle/get-vehicles-schema.js";
import { UpdateVehicleRouteType } from "../schemas/vehicle/update-vehicle-schema.js";
import { VehicleDto } from "../schemas/vehicle/vehicle-schema.js";

function getVehicles(req: FastifyRequest<GetVehiclesRouteType>, reply) {
  return vehicleService.getMany(req.query) as unknown as VehicleDto[];
}

function getVehicleById(req: FastifyRequest<GetVehicleByIdRouteType>, reply) {
  return vehicleService.getById(req.params.id) as unknown as VehicleDto;
}

function createVehicle(req: FastifyRequest<CreateVehicleRouteType>, rep: FastifyReply) {
  rep.statusCode = StatusCodes.CREATED;
  return vehicleService.create(req.body) as unknown as VehicleDto;
}

function updateVehicle(req: FastifyRequest<UpdateVehicleRouteType>, rep: FastifyReply) {
  return vehicleService.update(req.params.id, req.body);
}

function deleteVehicle(req: FastifyRequest<DeleteVehicleRouteType>, rep: FastifyReply) {
  return vehicleService.deleteById(req.params.id);
}

export const vehicleController = { getVehicles, createVehicle, getVehicleById, updateVehicle, deleteVehicle };
