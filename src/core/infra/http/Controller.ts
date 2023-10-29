import { FastifyReply, FastifyRequest } from 'fastify'
import { Reply } from './Reply'

export class Controller extends Reply {
  handle(request: FastifyRequest, response: FastifyReply): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
