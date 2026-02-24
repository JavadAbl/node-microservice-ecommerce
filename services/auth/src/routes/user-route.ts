import { FastifyPluginAsync } from "fastify";
import { userService } from "../services/user-service.js";
import {
  SetUserRoleRouteType,
  SetUserRoleSchema,
} from "../schemas/user/request-schema/set-user-role-schema.js";

export const userRoutes: FastifyPluginAsync = async (app) => {
  // Set user role ------------------------------------------------
  app.post<SetUserRoleRouteType>(
    "Admin/:userId/SetRole",
    { schema: SetUserRoleSchema },
    async (request, reply) => {
      return userService.setUserRole(request.params.userId, request.body);
    },
  );
};
