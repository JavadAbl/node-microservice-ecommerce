import { Static, Type } from "@sinclair/typebox";
import { ClaimType } from "../../enums/claim-type.enum.js";

export const ClaimDtoSchema = Type.Object({
  id: Type.Integer({ description: "Unique identifier for the claim" }),
  name: Type.String({ minLength: 3, description: "Name of the claim" }),
  type: Type.Enum(ClaimType, { description: "Type of the claim" }),
  description: Type.Optional(
    Type.Union([Type.String({ description: "Description of the claim" }), Type.Null()]),
  ),
  parentId: Type.Optional(Type.Integer({ description: "Parent claim ID" })),
});

export type ClaimDto = Static<typeof ClaimDtoSchema>;
