import { environment } from '@/config/environment'
import { app } from './app'

export function startServer(): void {
  app.listen(
    {
      host: environment.FASTIFY_SERVER_HOST,
      port: environment.FASTIFY_SERVER_PORT,
    },
    (_err, address) => {
      console.info(`Server started on "${address}".`)
    },
  )
}
