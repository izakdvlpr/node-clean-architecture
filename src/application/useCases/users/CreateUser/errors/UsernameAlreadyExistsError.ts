import { ErrorBase } from '@/core/domain/ErrorBase'

export class UsernameAlreadyExistsError extends ErrorBase {
  constructor(username: string) {
    super({
      message: `There is already a registered user with this username "${username}".`,
      code: 'UsernameAlreadyExistsError',
      status: 400,
    })
  }
}
