import { FastifyPluginAsync } from "fastify";
import { vehicleServiceController } from "../controllers/vehicle-service-controller.js";
import {
  GetVehicleServiceByIdRouteType,
  GetVehicleServiceByIdSchema,
} from "../schemas/vehicle-service/get-by-id-vehicle-service-schema.js";
import {
  GetVehicleServiceHistoriesRouteType,
  GetVehicleServiceHistoriesSchema,
} from "../schemas/vehicle-service/get-vehicle-services-schema.js";
import {
  CreateVehicleServiceRouteType,
  CreateVehicleServiceSchema,
} from "../schemas/vehicle-service/create-vehicle-service-schema.js";
import {
  DeleteVehicleServiceRouteType,
  DeleteVehicleServiceSchema,
} from "../schemas/vehicle-service/delete-vehicle-service-schema.js";
import {
  UpdateVehicleServiceRouteType,
  UpdateVehicleServiceSchema,
} from "../schemas/vehicle-service/update-vehicle-service-schema.js";

export const vehicleServiceRoutes: FastifyPluginAsync = async (app) => {
  // Get all vehicle service histories----------------------------------------------
  app.get<GetVehicleServiceHistoriesRouteType>(
    "/service-history",
    { schema: GetVehicleServiceHistoriesSchema },
    (request, reply) => vehicleServiceController.getVehicleServiceHistories(request, reply),
  );

  // Get vehicle service history by id---------------------------------------------
  app.get<GetVehicleServiceByIdRouteType>(
    "/service-history/:id",
    { schema: GetVehicleServiceByIdSchema },
    (request, reply) => vehicleServiceController.getVehicleServiceById(request, reply),
  );

  // Create vehicle service history ------------------------------------------------
  app.post<CreateVehicleServiceRouteType>(
    "/service-history",
    { schema: CreateVehicleServiceSchema },
    (request, reply) => vehicleServiceController.createVehicleService(request, reply),
  );

  // Update vehicle service history ------------------------------------------------
  app.put<UpdateVehicleServiceRouteType>(
    "/service-history/:id",
    { schema: UpdateVehicleServiceSchema },
    (request, reply) => vehicleServiceController.updateVehicleService(request, reply),
  );

  // Delete vehicle service history ------------------------------------------------
  app.delete<DeleteVehicleServiceRouteType>(
    "/service-history/:id",
    { schema: DeleteVehicleServiceSchema },
    (request, reply) => vehicleServiceController.deleteVehicleService(request, reply),
  );
};
