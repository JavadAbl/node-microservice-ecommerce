import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { config } from "../config.js";

const adapter = new PrismaMariaDb(config.DATABASE_URL);
export const prisma = new PrismaClient({ adapter });
