import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { config } from "../config.js";
import { PrismaClient } from "./generated/prisma/client.js";

export const prismaAdapter = new PrismaMariaDb({
  ssl: false,
  host: "localhost",
  user: "root",
  password: "root",
  database: "notifications_db",
  port: 3306,
  acquireTimeout: 5000,
});

export const prisma = new PrismaClient({ adapter: prismaAdapter });
