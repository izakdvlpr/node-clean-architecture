import { UserRepository } from '@/application/repositories/UserRepository'
import { UseCase } from '@/core/domain/UseCase'
import { Either, left, right } from '@/core/logic/Either'
import { User } from '@/domain/entities/User'
import { Email } from '@/domain/valueObjects/email'
import { UserEmailAlreadyExistsError } from './errors/UserEmailAlreadyExistsError'
import { CreateUserDTO } from '@/application/dtos/CreateUserDTO'
import { Result } from '@/core/logic/Result'
import { Username } from '@/domain/valueObjects/username'
import { Password } from '@/domain/valueObjects/password'
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError'

export type CreateUserResponse = Promise<
  Either<
    Result<any> | UsernameAlreadyExistsError | UserEmailAlreadyExistsError,
    User
  >
>

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, CreateUserResponse>
{
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
    email,
    password,
  }: CreateUserDTO): CreateUserResponse {
    const usernameOrError = Username.create(username)
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    const combinedPropsResult = Result.combine([
      usernameOrError,
      emailOrError,
      passwordOrError,
    ])

    if (combinedPropsResult.isFailure) {
      const combinedFailResult = Result.fail(combinedPropsResult.error)

      return left(combinedFailResult.getError())
    }

    const usernameAlreadyExists =
      await this.userRepository.findByUsername(username)

    if (usernameAlreadyExists) {
      return left(new UsernameAlreadyExistsError(username))
    }

    const userEmailAlreadyExists = await this.userRepository.findByEmail(email)

    if (userEmailAlreadyExists) {
      return left(new UserEmailAlreadyExistsError(email))
    }

    const user = User.create({
      username,
      email,
      passwordHash: await Password.generateHash(password),
    })

    await this.userRepository.create(user)

    return right(user)
  }
}
