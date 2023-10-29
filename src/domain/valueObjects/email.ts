import { Result } from '@/core/logic/Result'

import { EmailBadFormattedError } from './errors/EmailBadFormattedError'
import { Guard } from '@/core/logic/Guard'
import { ErrorBase } from '@/core/domain/ErrorBase'

export class Email {
  protected constructor(private readonly email: string) {}

  get value(): string {
    return this.email
  }

  private static isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
  }

  static create(email: string): Result<Email> {
    const hasEmail = Guard.againstNullOrUndefined(email, 'email')

    if (!hasEmail.succeeded) {
      return Result.fail(<ErrorBase>hasEmail.error)
    }

    const isEmailValid = this.isEmailValid(email)

    if (!isEmailValid) {
      return Result.fail(new EmailBadFormattedError(email))
    }

    return Result.ok(new Email(email))
  }
}
