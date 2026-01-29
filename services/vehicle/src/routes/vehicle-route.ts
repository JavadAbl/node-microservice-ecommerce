import { FastifyPluginAsync } from "fastify";
import {
  GetVehiclesRequestRouteType,
  GetVehiclesRequestSchema,
} from "../schemas/vehicle/get-vehicle-schema.js";
import { vehicleController } from "../controllers/vehicle-controller.js";

export const claimRoutes: FastifyPluginAsync = async (app) => {
  // Get all claims
  app.get<GetVehiclesRequestRouteType>("/", { schema: GetVehiclesRequestSchema }, (request, reply) =>
    vehicleController.getVehicles(request, reply),
  );
};
