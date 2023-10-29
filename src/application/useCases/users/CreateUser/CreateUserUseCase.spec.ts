import { describe, beforeEach, it, expect } from 'bun:test'

import { UserRepository } from '@/application/repositories/UserRepository'
import { InMemoryUserRepository } from '@/tests/repositories/InMemoryUserRepository'
import { createUser } from '@/tests/factories/UserFactory'

import { UserEmailAlreadyExistsError } from './errors/UserEmailAlreadyExistsError'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('CreateUserUseCase', () => {
  let userRepository: UserRepository

  let createUserUseCase: CreateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()

    createUserUseCase = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a user', async () => {
    const userOrError = await createUserUseCase.execute({
      username: 'jhondoe',
      email: 'johndoe@example.com',
      password: 'super-secure-pa$$word',
    })

    expect(userOrError.isRight()).toBeTruthy()
    expect(await userRepository.findByEmail('johndoe@example.com')).toBeTruthy()
  })

  it('should return a error when passing invalid data', async () => {
    const userOrError = await createUserUseCase.execute({
      username: 'jhondoe#!$$',
      email: 'johndoe@',
      password: 'pass',
    })

    expect(userOrError.isLeft()).toBeTruthy()
  })

  it('should return a error when passing an email associated with an existing account', async () => {
    const email = 'johndoe@example.com'

    const user = await createUser({ email })

    await userRepository.create(user)

    const userOrError = await createUserUseCase.execute({
      username: 'jhondoe',
      email: 'johndoe@example.com',
      password: 'super-secure-pa$$word',
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(new UserEmailAlreadyExistsError(email))
  })
})
