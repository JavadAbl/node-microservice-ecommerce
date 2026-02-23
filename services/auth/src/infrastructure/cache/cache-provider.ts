import { createClient } from "redis";

export const cacheClient = createClient();
cacheClient.on("error", (err) => console.error("Redis Client Error", err));
cacheClient.on("connect", () => console.log("Redis Client Connected"));

export async function startCacheClient() {
  await cacheClient.connect();
}

export async function cacheCheckConnection() {
  if (!cacheClient.isOpen) await cacheClient.connect();
}
