import { FastifyReply, FastifyRequest } from 'fastify'

import { Controller } from '@/core/infra/http/Controller'
import { CreateUserUseCase } from '@/application/useCases/users/CreateUser/CreateUserUseCase'

export class CreateUserController extends Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super()
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { username, email, password } = request.body as Record<string, string>

    const createUserOrError = await this.createUserUseCase.execute({
      username,
      email,
      password,
    })

    if (createUserOrError.isLeft()) {
      const error = createUserOrError.value

      this.clientError(reply, error)

      return
    }

    this.created(reply)
  }
}
