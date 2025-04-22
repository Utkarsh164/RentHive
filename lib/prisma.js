import { PrismaClient } from "@prisma/client";

// Choose correct DB URL based on environment
const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.NODE_ENV === "development"
          ? process.env.DIRECT_URL
          : process.env.DATABASE_URL,
    },
  },
});

// Reuse Prisma client during development
export const db = globalThis.db || prismaClient;

if (process.env.NODE_ENV !== "production") {
  globalThis.db = db;
}
