import { FastifyPluginAsync } from "fastify";
import { SendOtpRouteType, SendOtpSchema } from "../schemas/auth/request/send-otp.schema.js";
import { authService } from "../services/auth.service.js";
import { VerifyOtpRouteType, VerifyOtpSchema } from "../schemas/auth/request/verify-otp.schema.js";
import {
  CreatePermissionRouteType,
  CreatePermissionSchema,
} from "../schemas/auth/request/create-permission.schema.js";
import {
  DeletePermissionRouteType,
  DeletePermissionSchema,
} from "../schemas/auth/request/delete-permission.schema.js";

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Send otp ------------------------------------------------
  app.post<SendOtpRouteType>("Send", { schema: SendOtpSchema }, async (request, reply) => {
    return authService.sendOtp(request.body);
  });

  // Send otp ------------------------------------------------
  app.post<VerifyOtpRouteType>("Verify", { schema: VerifyOtpSchema }, async (request, reply) => {
    return authService.verifyOtp(request.body);
  });

  // Create Permission------------------------------------------------
  app.post<CreatePermissionRouteType>(
    "Admin/Permission",
    { schema: CreatePermissionSchema },
    async (request, reply) => {
      return authService.createPermission(request.body);
    },
  );

  // Delete Permission------------------------------------------------
  app.delete<DeletePermissionRouteType>(
    "Admin/Permission/:id",
    { schema: DeletePermissionSchema },
    async (request, reply) => {
      return authService.deletePermission(request.params.id);
    },
  );
};
