import { ErrorBase } from '@/core/domain/ErrorBase'

export class UsernameBadFormattedError extends ErrorBase {
  constructor(username: string) {
    super({
      message: `The username "${username}" is bad formatted.`,
      code: 'UsernameBadFormattedError',
      status: 400,
    })
  }
}
