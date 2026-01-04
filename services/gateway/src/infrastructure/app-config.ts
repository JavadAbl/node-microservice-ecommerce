import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
  NODE_ENV: process.env.NODE_ENV,
  HTTP_PORT: parseInt(process.env.HTTP_PORT),
  HTTP_HOST: process.env.HTTP_HOST,
  KEYCLOAK_ADDRESS: process.env.KEYCLOAK_ADDRESS,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
};
