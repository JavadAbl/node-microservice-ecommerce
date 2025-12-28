import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { config } from "../config.js";

export class PrismaProvider {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaProvider.instance) {
      const dbFile = config.DATABASE_URL.replace("file:.", "");
      const dbPath = process.cwd() + dbFile;
      const adapter = new PrismaBetterSqlite3({
        url: dbPath,
      });
      const prisma = new PrismaClient({ adapter });

      PrismaProvider.instance = prisma;
    }
    return PrismaProvider.instance;
  }

  static async onModuleDestroy() {
    if (PrismaProvider.instance) {
      await PrismaProvider.instance.$disconnect();
    }
  }
}
