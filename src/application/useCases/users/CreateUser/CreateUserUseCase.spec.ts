import { UserRepository } from '@/application/repositories/UserRepository'
import { InMemoryUserRepository } from '@/tests/repositories/InMemoryUserRepository'
import { createUser } from '@/tests/factories/UserFactory'

import { UserEmailAlreadyExistsError } from './errors/UserEmailAlreadyExistsError'
import { CreateUserUseCase } from './CreateUserUseCase'
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError'

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

  it('should return a error when passing an username associated with an existing account', async () => {
    const usernameTarget = 'jhondoe'

    const user = await createUser({
      username: usernameTarget,
    })

    await userRepository.create(user)

    const userOrError = await createUserUseCase.execute({
      username: usernameTarget,
      email: 'johndoe@example.com',
      password: 'super-secure-pa$$word',
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(
      new UsernameAlreadyExistsError(usernameTarget),
    )
  })

  it('should return a error when passing an email associated with an existing account', async () => {
    const emailTarget = 'johndoe@example.com'

    const user = await createUser({
      username: 'jhon.doe',
      email: emailTarget,
    })

    await userRepository.create(user)

    const userOrError = await createUserUseCase.execute({
      username: 'jhondoe',
      email: emailTarget,
      password: 'super-secure-pa$$word',
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(
      new UserEmailAlreadyExistsError(emailTarget),
    )
  })
})
