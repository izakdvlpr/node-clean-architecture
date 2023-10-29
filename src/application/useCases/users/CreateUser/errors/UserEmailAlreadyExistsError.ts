import { ErrorBase } from '@/core/domain/ErrorBase'

export class UserEmailAlreadyExistsError extends ErrorBase {
  constructor(email: string) {
    super({
      message: `There is already a registered user with email "${email}".`,
      code: 'UserEmailAlreadyExistsError',
      status: 400,
    })
  }
}
