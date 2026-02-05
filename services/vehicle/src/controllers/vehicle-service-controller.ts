import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { vehicleServiceService } from "../services/vehicle-service-service.js";
import { CreateVehicleServiceRouteType } from "../schemas/vehicle-service/create-vehicle-service-schema.js";
import { DeleteVehicleServiceRouteType } from "../schemas/vehicle-service/delete-vehicle-service-schema.js";
import { GetVehicleServiceByIdRouteType } from "../schemas/vehicle-service/get-by-id-vehicle-service-schema.js";
import { GetVehicleServiceHistoriesRouteType } from "../schemas/vehicle-service/get-vehicle-services-schema.js";
import { UpdateVehicleServiceRouteType } from "../schemas/vehicle-service/update-vehicle-service-schema.js";
import { VehicleServiceDto } from "../schemas/vehicle-service/vehicle-service-schema.js";

function getVehicleServiceHistories(req: FastifyRequest<GetVehicleServiceHistoriesRouteType>, reply) {
  return vehicleServiceService.getMany(req.query) as unknown as VehicleServiceDto[];
}

function getVehicleServiceById(req: FastifyRequest<GetVehicleServiceByIdRouteType>, reply) {
  return vehicleServiceService.getById(req.params.id) as unknown as VehicleServiceDto;
}

function createVehicleService(req: FastifyRequest<CreateVehicleServiceRouteType>, rep: FastifyReply) {
  rep.statusCode = StatusCodes.CREATED;
  return vehicleServiceService.create(req.body) as unknown as VehicleServiceDto;
}

function updateVehicleService(req: FastifyRequest<UpdateVehicleServiceRouteType>, rep: FastifyReply) {
  return vehicleServiceService.update(req.params.id, req.body) as unknown as VehicleServiceDto;
}

function deleteVehicleService(req: FastifyRequest<DeleteVehicleServiceRouteType>, rep: FastifyReply) {
  return vehicleServiceService.deleteById(req.params.id) as unknown as VehicleServiceDto;
}

export const vehicleServiceController = {
  getVehicleServiceHistories,
  createVehicleService,
  getVehicleServiceById,
  updateVehicleService,
  deleteVehicleService,
};
