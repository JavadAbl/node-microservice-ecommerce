import { apiKeycloak } from "@/lib/base-api";

export function findUserByUsername(username: string) {
  return apiKeycloak.get(``);
}
