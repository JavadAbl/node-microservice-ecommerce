import { createClient } from "redis";

export const client = createClient();
client.on("error", (err) => console.error("Redis Client Error", err));
client.on("connect", () => console.log("Redis Client Connected.."));

async function startCacheClient() {
  await client.connect();
}
