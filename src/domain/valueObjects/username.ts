import { Result } from '@/core/logic/Result'

import { UsernameBadFormattedError } from './errors/UsernameBadFormattedError'
import { Guard } from '@/core/logic/Guard'
import { ErrorBase } from '@/core/domain/ErrorBase'

export class Username {
  protected constructor(private readonly username: string) {}

  get value(): string {
    return this.username
  }

  private static isUsernameValid(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9.]+$/

    return usernameRegex.test(username)
  }

  static create(username: string): Result<Username> {
    const hasUsername = Guard.againstNullOrUndefined(username, 'username')

    if (!hasUsername.succeeded) {
      return Result.fail(<ErrorBase>hasUsername.error)
    }

    const isUsernameWithinRange = Guard.inRange(
      username.length,
      3,
      255,
      'username',
    )

    if (!isUsernameWithinRange.succeeded) {
      return Result.fail(<ErrorBase>isUsernameWithinRange.error)
    }

    const isUsernameValid = this.isUsernameValid(username)

    if (!isUsernameValid) {
      return Result.fail(new UsernameBadFormattedError(username))
    }

    return Result.ok(new Username(username))
  }
}
