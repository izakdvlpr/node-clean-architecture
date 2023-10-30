import 'dotenv/config'

import {
  connectPostgresDatabase,
  executeDatabaseSeeds,
} from './infra/database/prisma/postgresql'
import { startServer } from './infra/http'

async function run() {
  await connectPostgresDatabase()
  await executeDatabaseSeeds()

  startServer()
}

run()
