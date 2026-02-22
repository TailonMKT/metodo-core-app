import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

export function getPrisma() {
  if (!prisma) {
    try {
      prisma = new PrismaClient();
    } catch (e: any) {
      console.error("Failed to initialize Prisma:", e);
      throw new Error(`Prisma Init Error: ${e.message}`);
    }
  }
  return prisma;
}

export default getPrisma;
