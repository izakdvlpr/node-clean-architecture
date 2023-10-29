import {
  connectPostgresDatabase,
  executeDatabaseSeeds,
} from './infra/database/prisma/postgresql'
import { startServer } from './infra/http'
;(async () => {
  await connectPostgresDatabase()
  await executeDatabaseSeeds()

  startServer()
})()
