import { createClient } from "redis";
import { config } from "../config.js";

export const cacheClient = createClient({
  password: config.REDIS_PASSWORD,
  url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
});
cacheClient.on("error", (err) => console.error("Redis Client Error", err));
cacheClient.on("connect", () => console.log("Redis Client Connected.."));

export async function startCacheClient() {
  await cacheClient.connect();
}

export async function cacheCheckConnection() {
  if (!cacheClient.isOpen) await cacheClient.connect();
}
