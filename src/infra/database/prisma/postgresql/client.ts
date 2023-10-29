import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function connectPostgresDatabase(): Promise<void> {
  await prisma
    .$connect()
    .then(() => console.log('Database connection successfully established.'))
}
