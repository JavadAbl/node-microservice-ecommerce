import { FastifyPluginAsync } from "fastify";
import { vehicleController } from "../controllers/vehicle-controller.js";
import {
  GetVehicleByIdRouteType,
  GetVehicleByIdSchema,
} from "../schemas/vehicle/get-by-id-vehicle-schema.js";
import { GetVehiclesRouteType, GetVehiclesSchema } from "../schemas/vehicle/get-vehicles-schema.js";
import { CreateVehicleRouteType, CreateVehicleSchema } from "../schemas/vehicle/create-vehicle-schema.js";
import { DeleteVehicleRouteType, DeleteVehicleSchema } from "../schemas/vehicle/delete-vehicle-schema.js";
import { UpdateVehicleRouteType, UpdateVehicleSchema } from "../schemas/vehicle/update-vehicle-schema.js";

export const vehicleRoutes: FastifyPluginAsync = async (app) => {
  // Get all vehicles----------------------------------------------
  app.get<GetVehiclesRouteType>("/", { schema: GetVehiclesSchema }, (request, reply) =>
    vehicleController.getVehicles(request, reply),
  );

  // Get vehicle by id---------------------------------------------
  app.get<GetVehicleByIdRouteType>("/:id", { schema: GetVehicleByIdSchema }, (request, reply) =>
    vehicleController.getVehicleById(request, reply),
  );

  // Create vehicle ------------------------------------------------
  app.post<CreateVehicleRouteType>("/", { schema: CreateVehicleSchema }, (request, reply) =>
    vehicleController.createVehicle(request, reply),
  );

  // Update vehicle ------------------------------------------------
  app.put<UpdateVehicleRouteType>("/:id", { schema: UpdateVehicleSchema }, (request, reply) =>
    vehicleController.updateVehicle(request, reply),
  );

  // Delete vehicle ------------------------------------------------
  app.delete<DeleteVehicleRouteType>("/:id", { schema: DeleteVehicleSchema }, (request, reply) =>
    vehicleController.deleteVehicle(request, reply),
  );
};
