import fastify from 'fastify'
import cors from '@fastify/cors'

import { usersRoutes } from './routes'

export const app = fastify()

app.register(cors, { origin: ['*'] })

app.register(usersRoutes)
