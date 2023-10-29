import { FastifyInstance } from 'fastify'

import { CreateUserUseCase } from '@/application/useCases/users/CreateUser'
import { PrismaUserRepository } from '@/infra/database/prisma/postgresql'

import { CreateUserController } from '../controllers/users/CreateUserController'

const userRepository = new PrismaUserRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

export function usersRoutes(app: FastifyInstance, _: any, done: any): void {
  app.post('/users', (request, reply) =>
    createUserController.handle(request, reply),
  )

  done()
}
