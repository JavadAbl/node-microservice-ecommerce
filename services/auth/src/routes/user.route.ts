import { FastifyPluginAsync } from "fastify";
import { userService } from "../services/user.service.js";
import {
  SetUserRoleRouteType,
  SetUserRoleSchema,
} from "../schemas/user/request-schema/set-user-role.schema.js";
import {
  SetUserPermissionRouteType,
  SetUserPermissionSchema,
} from "../schemas/user/request-schema/set-user-permission.schema.js";

export const userRoutes: FastifyPluginAsync = async (app) => {
  // Set user role ------------------------------------------------
  app.post<SetUserRoleRouteType>(
    "Admin/:id/SetRole",
    { schema: SetUserRoleSchema },
    async (request, reply) => {
      return userService.setUserRole(request.params.id, request.body);
    },
  );

  // Set user permissions ------------------------------------------------
  app.post<SetUserPermissionRouteType>(
    "Admin/:id/SetPermissions",
    { schema: SetUserPermissionSchema },
    async (request, reply) => {
      return userService.setUserPermissions(request.params.id, request.body);
    },
  );
};
