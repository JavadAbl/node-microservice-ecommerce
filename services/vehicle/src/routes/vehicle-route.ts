import { FastifyPluginAsync } from "fastify";
import {
  GetVehiclesRequestRouteType,
  GetVehiclesRequestSchema,
} from "../schemas/vehicle/get-vehicle-schema.js";
import { vehicleController } from "../controllers/vehicle-controller.js";

export const vehicleRoutes: FastifyPluginAsync = async (app) => {
  // Get all vehicles
  app.get<GetVehiclesRequestRouteType>("/", { schema: GetVehiclesRequestSchema }, (request, reply) =>
    vehicleController.getVehicles(request, reply),
  );
};
