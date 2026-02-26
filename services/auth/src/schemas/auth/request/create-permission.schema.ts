import { Static, Type } from "@sinclair/typebox";
import { FastifySchema, RouteGenericInterface } from "fastify";
import { PermissionDto, PermissionSchema } from "../reply/permission.schema.js";

export const CreatePermissionBodySchema = Type.Object({
  name: Type.String({
    description: "Permission name",
    // Matches: letters/numbers/underscores + hyphen + letters/numbers/underscores
    pattern: "^[a-zA-Z0-9_]+-[a-zA-Z0-9_]+$",
  }),
});

export const CreatePermissionSchema: FastifySchema = {
  body: CreatePermissionBodySchema,
  description: "Create Permission",
  tags: ["Auth"],
  response: { 201: PermissionSchema },
};

export type CreatePermissionDto = Static<typeof CreatePermissionBodySchema>;

export interface CreatePermissionRouteType extends RouteGenericInterface {
  Body: CreatePermissionDto;
  Reply: PermissionDto;
}
