import { environment } from '@/config/environment'

import { app } from './app'

const { FASTIFY_SERVER_HOST: host, FASTIFY_SERVER_PORT: port } = environment

export function startServer(): void {
  app.listen({ host, port }).then(() => {
    console.info(`Server started on "http://${host}:${port}".`)
  })
}
