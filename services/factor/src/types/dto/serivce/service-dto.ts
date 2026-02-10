import { ServiceReference } from "../../infrastructure/database/generated/prisma/client.js";
import { ServiceDto } from "./service-dto.js";

export type ServiceDto = { id: number; name: string; price: number };

export const toServiceDto = (entity: ServiceReference): ServiceDto => {
  return { id: entity.id, name: entity.name, price: entity.price };
};
