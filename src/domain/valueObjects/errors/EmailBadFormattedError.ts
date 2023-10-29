import { ErrorBase } from '@/core/domain/ErrorBase'

export class EmailBadFormattedError extends ErrorBase {
  constructor(email: string) {
    super({
      message: `The email "${email}" is bad formatted.`,
      code: 'EmailBadFormattedError',
      status: 400,
    })
  }
}
