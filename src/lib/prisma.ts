import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional: Configure connection pool settings
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

// Create a function to instantiate Prisma Client
const createPrismaClient = () => {
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

// Global singleton pattern for Next.js
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use existing client or create a new one
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// In development, save the client to global to prevent re-instantiation
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown handler
if (typeof window === "undefined") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
    await pool.end();
  });

  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
  });
}

// Export types for convenience
export type { PrismaClient } from "@prisma/client";
