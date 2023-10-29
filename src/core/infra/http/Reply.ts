import { FastifyReply } from 'fastify'

export class Reply {
  #custom(reply: FastifyReply, status: number, data?: any | undefined): void {
    if (data) {
      reply.status(status).send(data)

      return
    }

    reply.status(status).send()
  }

  ok(reply: FastifyReply, data?: any | undefined): void {
    this.#custom(reply, 200, data)
  }

  created(reply: FastifyReply, data?: any | undefined): void {
    this.#custom(reply, 201, data)
  }

  clientError(reply: FastifyReply, error?: any): void {
    this.#custom(reply, 400, error)
  }
}
