import { Result } from '@/core/logic/Result'

import { Guard } from '@/core/logic/Guard'
import { ErrorBase } from '@/core/domain/ErrorBase'

export class Password {
  protected constructor(private readonly password: string) {}

  get value(): string {
    return this.password
  }

  static async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const isMatch = await Bun.password.verify(password, passwordHash)

    return isMatch
  }

  static async generateHash(password: string): Promise<string> {
    const hashedValue = await Bun.password.hash(password)

    return hashedValue
  }

  static create(password: string): Result<Password> {
    const hasPassword = Guard.againstNullOrUndefined(password, 'password')

    if (!hasPassword.succeeded) {
      return Result.fail(<ErrorBase>hasPassword.error)
    }

    const isPasswordWithinRange = Guard.inRange(
      password.length,
      6,
      255,
      'password',
    )

    if (!isPasswordWithinRange.succeeded) {
      return Result.fail(<ErrorBase>isPasswordWithinRange.error)
    }

    return Result.ok(new Password(password))
  }
}
