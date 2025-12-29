import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { config } from "../config.js";

console.log(config.DATABASE_URL);

const adapter = new PrismaMariaDb({
  ssl: false,
  host: "localhost",
  user: "root",
  password: "root",
  database: "notifications_db",
  port: 3306,
});
export const prisma = new PrismaClient({ adapter });
