import { FastifyPluginAsync } from "fastify";
import { userService } from "../services/user.service.js";
import { SetUserRoleRouteType, SetUserRoleSchema } from "../schemas/user/request/set-user-role.schema.js";
import {
  SetUserPermissionRouteType,
  SetUserPermissionSchema,
} from "../schemas/user/request/set-user-permission.schema.js";
import { GetManyUsersRouteType, GetManyUsersSchema } from "../schemas/user/request/get-many-users.schema.js";

export const userRoutes: FastifyPluginAsync = async (app) => {
  // Get many users ------------------------------------------------
  app.get<GetManyUsersRouteType>("Admin", { schema: GetManyUsersSchema }, async (request, reply) => {
    return userService.getMany(request.query);
  });

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
